import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth/login");

    // 1-If user is authenticated and is on the auth page, redirect to the home page
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/client", req.url));
      }
      return null;
    }

    // If user is not authenticated, redirect to the login page
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

//2-Config
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
