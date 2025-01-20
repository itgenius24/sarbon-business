import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req) {
  let locale;

  // Check if the language cookie exists
  if (req.cookies.has(cookieName)) {
    locale = acceptLanguage.get(req.cookies.get(cookieName).value);
  }

  // If no locale from cookie, check Accept-Language header
  if (!locale) {
    const acceptLangHeader = req.headers.get("Accept-Language") || "";
    locale = acceptLanguage.get(acceptLangHeader);
  }

  // If no locale is found, use fallback language
  if (!locale) {
    locale = fallbackLng;
  }

  // If the URL doesn't have a language prefix, redirect
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    const response = NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}`, req.url));
    response.cookies.set(cookieName, locale, { path: "/", maxAge: 60 * 60 * 24 * 30 });  // Set cookie for 30 days
    return response;
  }

  // Set language cookie from referer if available
  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    }
    return response;
  }

  return NextResponse.next();
}
