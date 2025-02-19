// middleware.js
import { NextResponse } from "next/server";
import { parseCookies } from "nookies";

export function middleware(request) {

  const cookies = request?.cookies 
  const company_id =  cookies.get("userData")  ?  JSON.parse(cookies.get("userData")?.value||{})?.role_id : null; // company_id




  const roleOnePages = ["/ru/add-cargo", "/ru/my-load", "/ru/search-car","/dashboard"]; 
  const roleagesZ = ["/dashboard"]; 

  const currentPath = request.nextUrl.pathname;
  console.log(`company_id`, company_id,currentPath,request.url);


  if (roleOnePages.includes(currentPath) && company_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2` ) {
    return NextResponse.redirect(new URL("/ru", request.url));
  } else if (roleagesZ.includes(currentPath) && company_id === "48871d27-7361-4f69-8fe4-b54daf270739" ) {
    return NextResponse.redirect(new URL("/ru", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/svg|svg|favicon.ico|images|auth|login).*)", // Maxsus marshrutlarni chetlab o'tish
    "/",
  ],
};
