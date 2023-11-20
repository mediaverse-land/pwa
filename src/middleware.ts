import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const cookie = cookies().get("next-auth.callback-url");
  // console.log(cookie, "cookie");
  // const withath = await withAuth();
  // console.log(withath, "middleware");
  // const session = await getServerSession(authOptions);
  // console.log(session, "middleware");
  //   console.log(request.nextUrl, "NextRequest");
  //   if (request.nextUrl.search === "") {
  //     return NextResponse.redirect(new URL("/blogs?page=1", request.url));
  //   }
  // console.log(request, "==1====1==1=1=1==1");
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/",
};
