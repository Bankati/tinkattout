import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

// Ce module est aussi importé par le middleware (runtime edge) : aucune API Node ici.
// "server-only" y fonctionne (vérifié avec next build + next start, Next 16.4.3).

export const SESSION_COOKIE_NAME = "tinka_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;
const MIN_SECRET_LENGTH = 32;
// Clé de développement : jamais utilisée quand NODE_ENV vaut "production".
const DEV_ONLY_SECRET = "tinka-tout-dev-only-secret-never-used-in-production";

let cachedKey: Uint8Array | null = null;
let devSecretWarned = false;

/**
 * Source unique de la clé de signature des sessions admin (pages, actions, middleware).
 * En production, AUTH_SECRET est obligatoire (32 caractères minimum) : sinon on lève une erreur.
 * Lecture paresseuse : le build ne casse pas si la variable n'existe qu'à l'exécution.
 */
export function getSecret(): Uint8Array {
  if (cachedKey) return cachedKey;

  const secret = process.env.AUTH_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!secret || secret.length < MIN_SECRET_LENGTH) {
      throw new Error(
        `AUTH_SECRET absent ou trop court (${MIN_SECRET_LENGTH} caractères minimum) : sessions admin impossibles.`,
      );
    }
    cachedKey = new TextEncoder().encode(secret);
    return cachedKey;
  }

  if (!secret && !devSecretWarned) {
    devSecretWarned = true;
    console.warn("[auth] AUTH_SECRET absent : clé de développement utilisée (interdit en production).");
  }
  cachedKey = new TextEncoder().encode(secret || DEV_ONLY_SECRET);
  return cachedKey;
}

/** Vérifie un jeton de session. Une clé mal configurée lève une erreur au lieu d'être confondue avec un jeton invalide. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const key = getSecret();
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload.admin === true;
  } catch {
    return false;
  }
}

export async function createSession() {
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

/**
 * À appeler en première ligne de chaque action admin et de chaque page admin qui lit la base.
 * Double le middleware : une action serveur reste joignable même si le matcher change.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await getSession())) redirect("/admin/login");
}
