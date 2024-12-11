import { NextResponse } from "next/server";

export const middleware = (request) => {
  // Extract the JWT token from cookies
  const token = request.cookies.get("token");

  // Define the login and protected paths
  const loginPage = "/Login";
  const protectedPath = request.nextUrl.pathname;

 
  if (!token) {
    return NextResponse.redirect(new URL(loginPage, request.url));
  }

  
  return NextResponse.next();
};

export const config = {
  // Add matchers for the paths you want to protect
  matcher: ["/about", "/Dashboard/:path*"], // Example protected routes
};
