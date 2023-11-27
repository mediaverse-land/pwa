import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log(request.url);
  if (
    request.nextUrl.pathname === "/web-app/explore" ||
    request.nextUrl.pathname === "/web-app"
  ) {
    return NextResponse.redirect(
      new URL("/web-app/explore/assets", request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/web-app", "/web-app/explore"],
};
