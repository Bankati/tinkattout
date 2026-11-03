import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname === "/admin/logout") return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (await verifySessionToken(token)) return NextResponse.next();

  const res = NextResponse.redirect(new URL("/admin/login", request.url));
  if (token) res.cookies.delete(SESSION_COOKIE_NAME);
  return res;
}

// Toutes les pages admin, y compris les futures sous-pages ; requireAdmin() reste la seconde barrière.
export const config = { matcher: ["/admin", "/admin/:path*"] };
