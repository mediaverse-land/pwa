import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { NextRequest } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import { withAuth } from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const withath = await withAuth();
  // console.log(withath, "middleware");
  // const session = await getServerSession(authOptions);
  // console.log(session, "middleware");
  //   console.log(request.nextUrl, "NextRequest");
  //   if (request.nextUrl.search === "") {
  //     return NextResponse.redirect(new URL("/blogs?page=1", request.url));
  //   }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/",
};
