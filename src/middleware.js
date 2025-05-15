// middleware.js
import { NextResponse } from "next/server";
export function middleware(request) {
  const cookies = request?.cookies;
  const company_id = cookies.get("userData")
    ? JSON.parse(cookies.get("userData")?.value || {})?.role_id
    : null;
  const dispatcherRole = cookies.get("userData")
    ? JSON.parse(cookies.get("userData")?.value || {})?.dispatcher_type?.[0]
    : null;

  console.log(`dispatcherRole`, dispatcherRole);

  const roleCarrierPages = [
    "/ru/add-cargo",
    "/ru/my-load",
    "/ru/search-car",
    "/dashboard",
    "/dashboard",
    "/my-load",
    "/search-car",
    "/my-loads",
    "/gps-tracking-customer",
    "/gps-tracking-dispatcher",
    "/gps-tracking-dispatcher-top",
    "/gps-tracking-super-admin",
    "/dispatcher",
    "/my-cars-dispatcher",
    "/search-load-dispatcher",
    "/search-car",
    "/add-cargo-test",
    "/auth",
    "/dashboard-dispatcher",
    "/dispatcher-expeditor",
    "/dashboard-dispatcher-top",
    "/active-user-dis-top",
    "/all-cargo-dispatcher",
    "/my-cars-dispatcher-top",
  ];
  const roleCustomerPages = [
    "/dashboard",
    "/my-load",
    "/search-car",
    "/my-cars",
    "/gps-tracking-dispatcher",
    "/gps-tracking-carrier",
    "/gps-tracking-dispatcher-top",
    "/gps-tracking-super-admin",
    "/drivers",
    "/dispatcher",
    "/my-cars-dispatcher",
    "/performed",
    "/search-load-dispatcher",
    "/search-load",
    "/search-car",
    "/add-cargo-test",
    "/auth",
    "/dashboard-dispatcher",
    "/dispatcher-expeditor",
    "/dashboard-dispatcher-top",
    "/active-user-dis-top",
    "/all-cargo-dispatcher",
    "/my-cars-dispatcher-top",
  ];

  const roleDispatcherTopPages = [
    "/dashboard",
    "/dashboard-dispatcher",
    "/add-cargo",
    "/my-cars",
    "/gps-tracking-customer",
    "/gps-tracking-carrier",
    "/gps-tracking-dispatcher",
    "/gps-tracking-super-admin",
    "/drivers",
    "/performed",
    "/search-load",
    "/search-car",
    "/add-cargo-test",
    "/auth",
    "/my-cars-dispatcher",
    "/my-loads",
    "/dispatcher-expeditor",
    "/active-user",
  ];

  const roleDispatcherPages = [
    "/dashboard",
    "/add-cargo",
    "/my-cars",
    "/gps-tracking-customer",
    "/gps-tracking-carrier",
    "/gps-tracking-dispatcher-top",
    "/gps-tracking-super-admin",
    "/drivers",
    "/performed",
    "/search-load",
    "/search-car",
    "/add-cargo-test",
    "/auth",
    "/my-cars-dispatcher-top",
    "/active-user",
    "/tin-create",
    "/dashboard-dispatcher-top",
    "/active-user-dis-top",
    "/dispatcher",
    "/all-cargo-dispatcher",
  ];

  const roleCeoPages = [
    "/add-cargo",
    "/my-load",
    "/search-car",
    "/my-loads",
    "/my-cars",
    "/gps-tracking-customer",
    "/gps-tracking-dispatcher",
    "/gps-tracking-dispatcher-top",
    "/gps-tracking-carrier",
    "/drivers",
    "/dispatcher",
    "/my-cars-dispatcher",
    "/performed",
    "/search-load-dispatcher",
    "/search-load",
    "/search-car",
    "/add-cargo-test",
    "/profile-xm",
    "/dashboard-dispatcher",
    "/dispatcher-expeditor",
    "/distance-calculation",
    "/dashboard-dispatcher-top",
    "/active-user-dis-top",
    "/all-cargo-dispatcher",
    "/my-cars-dispatcher-top",
  ];

  const rolePagesAuth = [
    "/dashboard",
    "/add-cargo",
    "/my-load",
    "/search-car",
    "/my-loads",
    "/my-cars",
    "/gps-tracking-carrier",
    "/gps-tracking-customer",
    "/gps-tracking-dispatcher",
    "/gps-tracking-carrier",
    "/gps-tracking-super-admin",
    "/drivers",
    "/dispatcher",
    "/my-cars-dispatcher",
    "/performed",
    "/search-load-dispatcher",
    "/search-load",
    "/search-car",
    "/add-cargo-test",
    "/profile",
    "/profile-xm",
    "/dashboard-dispatcher",
    "/dispatcher-expeditor",
    "/distance-calculation",
    "/dashboard-dispatcher-top",
    "/active-user-dis-top",
    "/all-cargo-dispatcher",
    "/my-cars-dispatcher-top",
  ];

  const currentPath = request.nextUrl.pathname.substring(3);

  if (
    roleCarrierPages.includes(currentPath) &&
    company_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2`
  ) {
    return NextResponse.redirect(new URL("/ru", request.url));
  } else if (
    roleCustomerPages.includes(currentPath) &&
    company_id === "48871d27-7361-4f69-8fe4-b54daf270739"
  ) {
    return NextResponse.redirect(new URL("/ru", request.url));
  } else if (
    roleDispatcherTopPages.includes(currentPath) &&
    company_id === "785678f2-fae7-4a00-8766-99ea67d3784f" &&
    dispatcherRole === `top_dispatcher`
  ) {
    return NextResponse.redirect(new URL("/ru/", request.url));
  } else if (
    roleDispatcherPages.includes(currentPath) &&
    company_id === "785678f2-fae7-4a00-8766-99ea67d3784f" &&
    dispatcherRole === `first_dispatcher`
  ) {
    return NextResponse.redirect(new URL("/ru/", request.url));
  } else if (
    roleCeoPages.includes(currentPath) &&
    company_id === "527d2017-2dc2-4449-9eeb-08fc1aafa469"
  ) {
    return NextResponse.redirect(new URL("/ru/", request.url));
  } else if (rolePagesAuth.includes(currentPath) && company_id === undefined) {
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
