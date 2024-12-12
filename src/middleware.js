import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (request) => {
  // Define the login page path
  const loginPage = "/Login";

  try {
    // Extract the token using next-auth's JWT utility
    const token = await getToken({
      req: request,
      secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    });

    // If no token is found, redirect to the login page
    if (!token || !token.email) {
      return NextResponse.redirect(new URL(loginPage, request.url));
    }

    // If the token exists, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    // Redirect to login on error (fail-safe)
    return NextResponse.redirect(new URL(loginPage, request.url));
  }
};

export const config = {
  // Protect specific routes
  matcher: ["/about", "/MakeAppoinment", "/Dashboard/:path*"],
};
