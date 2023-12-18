import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log(request.url);
  switch (request.nextUrl.pathname) {
    case "/app": {
      return NextResponse.redirect(new URL("/app/explore/", request.url));
    }
    case "/app/account": {
      return NextResponse.redirect(
        new URL("/app/account/subscribe", request.url)
      );
    }
    default:
      break;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/app", "/app/explore", "/app/account"],
};
