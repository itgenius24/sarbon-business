// middleware.js
import { NextResponse } from "next/server";
import { parseCookies } from "nookies";

export function middleware(request) {

  const cookies = request?.cookies 
  const company_id =  cookies.get("userData")  ?  JSON.parse(cookies.get("userData")?.value||{})?.role_id : null; // company_id

  // Ruxsat berilgan sahifalar bo'yicha ro'yxatlar
  const roleOnePages = ["/ru/add-cargo", "/ru/my-load", "/ru/search-car"]; // role_id = f81d3c3d-228d-479e-a2b1-9948c98640f2 uchun sahifalar
  const roleagesZ = ["/ru/gps-tracking",]; // role_id = 9bb1227a-0c90-4c70-bcee-b2563d32f7a0 uchun sahifalar

  const currentPath = request.nextUrl.pathname;



  if (roleOnePages.includes(currentPath) && company_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2` ) {
    return NextResponse.redirect(new URL("/ru/auth", request.url));
  }

  if (roleagesZ.includes(currentPath) && company_id === `Zakazcik` ) {
    return NextResponse.redirect(new URL("/ru/auth", request.url));
  }

 
//   if (roleOnePages.includes(roleTwoPages) && company_id) {
//     return NextResponse.redirect(new URL("/uz/auth", request.url));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/svg|svg|favicon.ico|images|auth|login).*)", // Maxsus marshrutlarni chetlab o'tish
    "/",
  ],
};
