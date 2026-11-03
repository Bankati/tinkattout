"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { logServerError, prisma } from "@/lib/db";

export async function markContactReplied(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!Number.isSafeInteger(id) || id <= 0) return;

  try {
    // repliedAt: null : un double clic ne remplace pas la date de la première réponse.
    await prisma.contact.updateMany({
      where: { id, repliedAt: null },
      data: { repliedAt: new Date() },
    });
  } catch (error) {
    logServerError("markContactReplied", error);
    return;
  }
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}
