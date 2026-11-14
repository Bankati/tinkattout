import "server-only";
import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** Faux tant qu'aucune base n'est branchée (site déployé sans base, en attendant Supabase). */
export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

/**
 * Résumé d'erreur sans donnée personnelle : type et code Prisma seulement.
 * Jamais le message complet ni l'objet d'erreur (ils peuvent contenir les valeurs saisies).
 */
function describeError(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) return `PrismaClientKnownRequestError ${error.code}`;
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return `PrismaClientInitializationError ${error.errorCode ?? "sans code"}`;
  }
  if (error instanceof Error) return error.name;
  return typeof error;
}

export function logServerError(context: string, error: unknown): void {
  console.error(`[${context}] ${describeError(error)}`);
}
