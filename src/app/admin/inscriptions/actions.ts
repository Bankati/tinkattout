"use server";
import { revalidatePath } from "next/cache";
import { REGISTRATION_STATUSES, type RegistrationStatus } from "@/config/school";
import { requireAdmin } from "@/lib/auth";
import { logServerError, prisma } from "@/lib/db";

function isRegistrationStatus(value: unknown): value is RegistrationStatus {
  return typeof value === "string" && Object.hasOwn(REGISTRATION_STATUSES, value);
}

export async function updateRegistrationStatus(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const status = formData.get("status");
  if (!Number.isSafeInteger(id) || id <= 0 || !isRegistrationStatus(status)) return;

  try {
    await prisma.registration.update({ where: { id }, data: { status } });
  } catch (error) {
    logServerError("updateRegistrationStatus", error);
    return;
  }
  revalidatePath("/admin");
  revalidatePath("/admin/inscriptions");
}
