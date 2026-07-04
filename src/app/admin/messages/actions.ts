"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function markContactReplied(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.contact.update({
    where: { id },
    data: { repliedAt: new Date() },
  });
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}
