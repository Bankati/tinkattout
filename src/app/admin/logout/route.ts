import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  await deleteSession();
  const url = new URL("/admin/login", request.url);
  return NextResponse.redirect(url);
}
