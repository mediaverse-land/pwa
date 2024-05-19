import { NextResponse, NextRequest } from "next/server";
import { Locale } from "./types/dictionary-types";
export let locales: Locale[] = ["en", "fr", "de", "fa"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  const preferredLanguage = acceptLanguage?.split(",")[0].slice(0, 2);
  return preferredLanguage;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log(request.nextUrl);
  if (pathname.endsWith("/sitemap.xml")) {
    return NextResponse.rewrite(
      `${request.nextUrl.origin}/${locales[0]}${pathname}`
    );
  }
  const pathnameHasLocale = locales.some(
    (localeLang) =>
      pathname.startsWith(`/${localeLang}/`) || pathname === `/${localeLang}`
  );
  if (pathnameHasLocale) return;
  const locale = getLocale(request);
  return NextResponse.redirect(
    `${request.nextUrl.origin}/${
      locales.find((item) => item === locale) ? locale : locales[0]
    }${pathname}${request.nextUrl.search}`
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icons|images|favicon.ico).*)"],
};
