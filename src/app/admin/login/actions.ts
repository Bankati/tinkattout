"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function loginAdmin(formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return { error: "Identifiants incorrects." };
  }

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
    return { error: "Identifiants incorrects." };
  }

  await createSession();
  redirect("/admin");
}
