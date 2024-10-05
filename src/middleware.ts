import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GetSessionIdFromCookies } from "./utils/cookie-funcs";

const authPages = ["/signin", "/forgot-password", "/signup"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next")
  )
    return;
  const session = await GetSessionIdFromCookies();

  if (!session && !authPages.includes(request.nextUrl.pathname))
    return NextResponse.redirect(new URL("/signin", request.nextUrl));

  if (session && authPages.includes(request.nextUrl.pathname))
    return NextResponse.redirect(new URL("/", request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
