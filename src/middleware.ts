import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.nextUrl, "NextRequest");
  if (request.nextUrl.search === "") {
    return NextResponse.redirect(new URL("/blogs?page=1", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/blogs",
};
