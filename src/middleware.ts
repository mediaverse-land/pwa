import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log(request.url);
  switch (request.nextUrl.pathname) {
    case "/web-app/explore": {
      return NextResponse.redirect(
        new URL("/web-app/explore/assets", request.url)
      );
    }
    case "/web-app": {
      return NextResponse.redirect(
        new URL("/web-app/explore/assets", request.url)
      );
    }
    case "/web-app/account": {
      return NextResponse.redirect(
        new URL("/web-app/account/subscribe", request.url)
      );
    }
    default:
      break;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/web-app", "/web-app/explore", "/web-app/account"],
};
