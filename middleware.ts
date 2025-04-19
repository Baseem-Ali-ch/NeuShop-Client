
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // const accessToken = req.cookies.get("userAccessToken");

  // const { pathname } = req.nextUrl;

  // const publicRoutes = ["/auth/login", "/auth/register", "/auth/two-factor/verify"];

  // const protectedRoutes = ["/account"];

  // if (accessToken && publicRoutes.includes(pathname)) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/account";
  //   return NextResponse.redirect(url);
  // }

  // if (!accessToken && protectedRoutes.some((route) => pathname.startsWith(route))) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/auth/login";
  //   return NextResponse.redirect(url);
  // }

  // return NextResponse.next();
}