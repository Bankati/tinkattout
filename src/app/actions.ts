"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInscription(formData: FormData) {
  const rawFormData = {
    studentName: formData.get("studentName") as string,
    gradeLevel: formData.get("gradeLevel") as string,
    parentName: formData.get("parentName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  // Basic validation
  if (
    !rawFormData.studentName ||
    !rawFormData.gradeLevel ||
    !rawFormData.parentName ||
    !rawFormData.email ||
    !rawFormData.phone
  ) {
    return { error: "Tous les champs sont obligatoires." };
  }

  try {
    await prisma.registration.create({
      data: {
        studentName: rawFormData.studentName,
        gradeLevel: rawFormData.gradeLevel,
        parentName: rawFormData.parentName,
        email: rawFormData.email,
        phone: rawFormData.phone,
        status: "PENDING",
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Une erreur est survenue lors de l'inscription." };
  }

  revalidatePath("/admin");
  redirect("/inscription/success");
}

export async function createContact(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim() || null;
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { error: "Nom, email et message sont obligatoires." };
  }

  try {
    await prisma.contact.create({
      data: { name, email, subject, message },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Une erreur est survenue. Réessayez plus tard." };
  }
  revalidatePath("/admin");
  return { success: true };
}
