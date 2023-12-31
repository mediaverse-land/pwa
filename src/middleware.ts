import { NextResponse, NextRequest } from "next/server";
let locales = ["en", "fr", "de"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  const preferredLanguage = acceptLanguage?.split(",")[0].slice(0, 2);
  return preferredLanguage;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
    `${request.nextUrl.origin}/${locale}${pathname}`
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)",
      // missing: [
      //   { type: "header", key: "next-router-prefetch" },
      //   { type: "header", key: "purpose", value: "prefetch" },
      // ],
    },
  ],
};
