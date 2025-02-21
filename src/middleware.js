// middleware.js
import { NextResponse } from "next/server";
import { parseCookies } from "nookies";

export function middleware(request) {
  const cookies = request?.cookies;
  const company_id = cookies.get("userData")
    ? JSON.parse(cookies.get("userData")?.value || {})?.role_id
    : null; 

  const roleExspePages = [
    "/ru/add-cargo",
    "/ru/my-load",
    "/ru/search-car",
    "/dashboard",
    "/dashboard",
    "/my-load",
    "/search-car",
    "/my-loads",
    "/gps-tracking-test",
    "/gps-tracking-xm",
    "/gps-tracking-dispatcher",
    "/dispatcher",
    "/my-cars-dispatcher",
    "/search-load-dispatcher",
    "/search-car",
    "/add-cargo-test",
    "/auth",
  ];
  const roleagesZ = [
    "/dashboard",
    "/my-load",
    "/search-car",
    "/my-loads",
    "/my-cars",
    "/gps-tracking-test",
    "/gps-tracking-dispatcher",
    "/gps-tracking",
    "/drivers",
    "/dispatcher",
    "/my-cars-dispatcher",
    "/performed",
    "/search-load-dispatcher",
    "/search-load",
    "/search-car",
    "/add-cargo-test",
    "/auth",
  ];

  const roleagesD = [
    "/dashboard",
    "/add-cargo",
    "/my-load",
    "/my-cars",
    "/gps-tracking-xm",
    "/gps-tracking-test",
    "/gps-tracking",
    "/drivers",
    "/performed",
    "/search-load",
    "/search-car",
    "/add-cargo-test",
    "/auth",
  ];

  const roleagesAuth = [
    "/dashboard",
    "/add-cargo",
    "/my-load",
    "/search-car",
    "/my-loads",
    "/my-cars",
    "/gps-tracking-xm",
    "/gps-tracking-test",
    "/gps-tracking-xm",
    "/gps-tracking-dispatcher",
    "/gps-tracking",
    "/drivers",
    "/dispatcher",
    "/my-cars-dispatcher",
    "/performed",
    "/search-load-dispatcher",
    "/search-load",
    "/search-car",
    "/add-cargo-test",
  ];

  const currentPath = request.nextUrl.pathname.substring(3);
  if (
    roleExspePages.includes(currentPath) &&
    company_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2`
  ) {
    return NextResponse.redirect(new URL("/ru", request.url));
  } else if (
    roleagesZ.includes(currentPath) &&
    company_id === "48871d27-7361-4f69-8fe4-b54daf270739"
  ) {
    return NextResponse.redirect(new URL("/ru", request.url));
  } else if (
    roleagesD.includes(currentPath) &&
    company_id === "785678f2-fae7-4a00-8766-99ea67d3784f"
  ) {
    return NextResponse.redirect(new URL("/ru/", request.url));
  } else if (roleagesAuth.includes(currentPath) && !company_id) {
    return NextResponse.redirect(new URL("/ru/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/svg|svg|favicon.ico|images|auth|login).*)", // Maxsus marshrutlarni chetlab o'tish
    "/",
  ],
};
