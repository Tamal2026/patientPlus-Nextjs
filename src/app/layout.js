"use client"
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "../components/Shared/NavBar/page.jsx";
import Footer from "@/components/Shared/Footer/page";
import AuthProvider from "@/services/AuthProvider";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SessionProvider>
            <div>
              <NavBar></NavBar>
              {children}
              <Footer></Footer>
            </div>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
