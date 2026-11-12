"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";
import { logServerError, prisma } from "@/lib/db";

// Hash bcrypt (coût 12, comme le seed) d'une valeur aléatoire jetée : comparé quand l'email
// n'existe pas, pour que la réponse prenne le même temps qu'un mauvais mot de passe.
const DUMMY_HASH = "$2b$12$k6AcJZYwCWV92IO1NrhWauSaEgBoMoOTnk2GDCPxDFeqor4jaxQOG";
const INVALID_CREDENTIALS = "Identifiants incorrects.";
const MAX_EMAIL_LENGTH = 254;
const MAX_PASSWORD_LENGTH = 200;

// Limite de tentatives EN MÉMOIRE : compteur propre à chaque instance du serveur.
// Pas fiable en serverless (Vercel : plusieurs instances, remises à zéro fréquentes).
// Une vraie limite demande un stockage partagé (table en base, Redis/Upstash).
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_TRACKED_KEYS = 1000;
const failures = new Map<string, { count: number; resetAt: number }>();

async function clientKey(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "inconnu";
}

function isLocked(key: string, now: number): boolean {
  const entry = failures.get(key);
  if (!entry) return false;
  if (entry.resetAt <= now) {
    failures.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(key: string, now: number): void {
  if (failures.size >= MAX_TRACKED_KEYS) {
    for (const [k, entry] of failures) if (entry.resetAt <= now) failures.delete(k);
    if (failures.size >= MAX_TRACKED_KEYS) failures.clear();
  }
  const entry = failures.get(key);
  if (entry && entry.resetAt > now) entry.count += 1;
  else failures.set(key, { count: 1, resetAt: now + WINDOW_MS });
}

export async function loginAdmin(formData: FormData): Promise<{ error: string }> {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const password = typeof rawPassword === "string" ? rawPassword : "";

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  const key = await clientKey();
  const now = Date.now();
  if (isLocked(key, now)) {
    return { error: "Trop de tentatives. Réessayez dans 15 minutes." };
  }

  if (email.length > MAX_EMAIL_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    recordFailure(key, now);
    return { error: INVALID_CREDENTIALS };
  }

  let storedHash: string | null = null;
  try {
    const admin = await prisma.admin.findUnique({ where: { email }, select: { password: true } });
    storedHash = admin?.password ?? null;
  } catch (error) {
    logServerError("loginAdmin", error);
    return { error: "Service momentanément indisponible. Réessayez plus tard." };
  }

  // Toujours une comparaison bcrypt, que le compte existe ou non (délai constant).
  const passwordOk = await bcrypt.compare(password, storedHash ?? DUMMY_HASH);
  if (!storedHash || !passwordOk) {
    recordFailure(key, now);
    return { error: INVALID_CREDENTIALS };
  }

  failures.delete(key);
  await createSession();
  redirect("/admin");
}
