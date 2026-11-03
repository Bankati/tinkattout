import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  await deleteSession();
  const url = new URL("/admin/login", request.url);
  // 303 : le navigateur suit la redirection en GET (307 renverrait un POST vers la page de connexion).
  return NextResponse.redirect(url, 303);
}
