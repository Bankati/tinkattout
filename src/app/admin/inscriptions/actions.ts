"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function updateRegistrationStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status") as string;
  if (!id || !["PENDING", "APPROVED", "REJECTED"].includes(status)) return;
  await prisma.registration.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
  revalidatePath("/admin/inscriptions");
}
