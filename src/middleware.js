// middleware.js
import { NextResponse } from "next/server";
import { parseCookies } from "nookies";

export function middleware(request) {

  const cookies = request?.cookies 
  const company_id =  cookies.get("userData")  ?  JSON.parse(cookies.get("userData")?.value||{})?.client_id : null; // company_id

  // Ruxsat berilgan sahifalar bo'yicha ro'yxatlar
  const roleOnePages = ["/ru/add-cargo", "/ru/my-load", "/ru/search-car"]; // role_id = f81d3c3d-228d-479e-a2b1-9948c98640f2 uchun sahifalar
//   const roleTwoPages = ["/ru/about-us", "/ru/news", "/ru/profile","/ru/search-car"]; // role_id = 9bb1227a-0c90-4c70-bcee-b2563d32f7a0 uchun sahifalar

  const currentPath = request.nextUrl.pathname;

  console.log(`currentPath`, request.nextUrl.pathname)


  if (roleOnePages.includes(currentPath) && company_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2` ) {
    return NextResponse.redirect(new URL("/uz/auth", request.url));
  }

//   if (roleOnePages.includes(roleTwoPages) && company_id) {
//     return NextResponse.redirect(new URL("/uz/auth", request.url));
//   }

  // 1. Agar birinchi ro'l (company_id === 'f81d3c3d-228d-479e-a2b1-9948c98640f2') uchun sahifalardan biriga kirsa
//   if (roleOnePages.includes(currentPath)) {
//     if (company_id !== "f81d3c3d-228d-479e-a2b1-9948c98640f2") {
//       console.log("Redirecting to /auth for role one page.");
//       return NextResponse.redirect(new URL("/auth", request.url));
//     }
//   }

//   // 2. Agar ikkinchi ro'l (company_id === '9bb1227a-0c90-4c70-bcee-b2563d32f7a0') uchun sahifalardan biriga kirsa
//   if (roleTwoPages.includes(currentPath)) {
//     if (company_id !== "9bb1227a-0c90-4c70-bcee-b2563d32f7a0") {
//       console.log("Redirecting to /auth for role two page.");
//       return NextResponse.redirect(new URL("/auth", request.url));
//     }
//   }

  // Agar company_id to'g'ri bo'lsa yoki restricted sahifalardan bo'lmasa, davom etadi
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/svg|svg|favicon.ico|images|auth|login).*)", // Maxsus marshrutlarni chetlab o'tish
    "/",
  ],
};
