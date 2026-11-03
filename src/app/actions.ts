"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { GRADE_LEVEL_VALUES, type RegistrationStatus } from "@/config/school";
import { logServerError, prisma } from "@/lib/db";

/** Contrat avec les formulaires : en cas d'erreur, message + champs saisis (jamais le champ piège). */
export type FormErrorState = { error: string; values: Record<string, string> };

// Champ caché anti-robot : un humain le laisse vide.
const HONEYPOT_FIELD = "website";
// Taille maximale renvoyée au navigateur pour chaque champ.
const MAX_ECHO_LENGTH = 5000;

const INSCRIPTION_FIELDS = ["studentName", "gradeLevel", "parentName", "email", "phone"] as const;
const CONTACT_FIELDS = ["name", "email", "subject", "message"] as const;

function requiredText(label: string, max: number) {
  return z
    .string()
    .trim()
    .min(1, `${label} est obligatoire.`)
    .max(max, `${label} ne doit pas dépasser ${max} caractères.`);
}

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "L'adresse email est obligatoire.")
  .max(254, "L'adresse email est trop longue.")
  .pipe(z.email("L'adresse email n'est pas valide."));

const phoneField = z
  .string()
  .trim()
  .min(1, "Le téléphone est obligatoire.")
  .max(25, "Le numéro de téléphone est trop long.")
  .regex(/^\+?[0-9 .()-]+$/, "Le numéro de téléphone n'est pas valide.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "").length;
    return digits >= 8 && digits <= 15;
  }, "Le numéro de téléphone n'est pas valide.");

const inscriptionSchema = z.object({
  studentName: requiredText("Le nom de l'élève", 100),
  gradeLevel: z.enum(GRADE_LEVEL_VALUES, "Veuillez choisir une classe valide."),
  parentName: requiredText("Le nom du parent", 100),
  email: emailField,
  phone: phoneField,
});

const contactSchema = z.object({
  name: requiredText("Le nom", 100),
  email: emailField,
  subject: z
    .string()
    .trim()
    .max(150, "Le sujet ne doit pas dépasser 150 caractères.")
    .transform((value) => (value === "" ? null : value)),
  message: requiredText("Le message", 5000),
});

function readFields(formData: FormData, fields: readonly string[]): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of fields) {
    const value = formData.get(field);
    values[field] = typeof value === "string" ? value : "";
  }
  return values;
}

function echoValues(raw: Record<string, string>): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [field, value] of Object.entries(raw)) values[field] = value.slice(0, MAX_ECHO_LENGTH);
  return values;
}

function isBot(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD);
  if (value === null) return false;
  return typeof value !== "string" || value.trim() !== "";
}

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Certains champs sont invalides.";
}

export async function createInscription(formData: FormData): Promise<FormErrorState> {
  // Robot : même réponse qu'un succès, rien n'est enregistré.
  if (isBot(formData)) redirect("/inscription/success");

  const raw = readFields(formData, INSCRIPTION_FIELDS);
  const parsed = inscriptionSchema.safeParse(raw);
  if (!parsed.success) return { error: firstIssue(parsed.error), values: echoValues(raw) };

  const status: RegistrationStatus = "PENDING";
  try {
    await prisma.registration.create({ data: { ...parsed.data, status } });
  } catch (error) {
    logServerError("createInscription", error);
    return {
      error: "Une erreur est survenue lors de l'inscription. Réessayez plus tard.",
      values: echoValues(raw),
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/inscriptions");
  redirect("/inscription/success");
}

export async function createContact(formData: FormData): Promise<FormErrorState | { success: true }> {
  if (isBot(formData)) return { success: true };

  const raw = readFields(formData, CONTACT_FIELDS);
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return { error: firstIssue(parsed.error), values: echoValues(raw) };

  try {
    await prisma.contact.create({ data: parsed.data });
  } catch (error) {
    logServerError("createContact", error);
    return { error: "Une erreur est survenue. Réessayez plus tard.", values: echoValues(raw) };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  return { success: true };
}
