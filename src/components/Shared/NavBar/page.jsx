"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Our Experts", href: "/Expert" },
    { name: "Services", href: "/Service" },
    { name: "Blog", href: "/Blog" },
    { name: "Contact us", href: "/Contact" },
  ];

  if (session) {
    navLinks.push({
      name: "Dashboard",
      href: session?.user?.role === "admin" ? "/Dashboard/admin" : "/Dashboard/user",
    });
  }

  const NavLink = ({ name, href, delay }) => (
    <Link
      href={href}
      className="text-gray-700 hover:text-blue-600 block md:inline-block opacity-0 transform translate-y-4 transition-opacity duration-500"
      style={{
        animation: `fadeInUp 0.5s ease forwards`,
        animationDelay: `${delay}s`,
      }}
    >
      {name}
    </Link>
  );

  const AppointmentButton = () => (
    <button
      onClick={() => router.push("/MakeAppoinment")}
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Book Appointment
    </button>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src="https://i.ibb.co/n7q1DXz/download-removebg-preview.jpg"
              alt="Logo"
              height={60}
              width={60}
              className="h-8 w-8 mr-2"
            />
            <span className="text-xl font-bold text-blue-600">PatientPlus</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link, index) => (
              <NavLink key={link.name} {...link} delay={index * 0.1} />
            ))}
            {/* Show Appointment Button only if the user is not an admin */}
            {session?.user?.role !== "admin" && <AppointmentButton />}

            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link href="/Login">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden space-y-4 mt-4">
            {navLinks.map((link, index) => (
              <NavLink key={link.name} {...link} delay={index * 0.1} />
            ))}
            {/* Show Appointment Button only if the user is not an admin */}
            {session?.user?.role !== "admin" && (
              <div
                style={{
                  animation: `fadeInUp 0.5s ease forwards`,
                  animationDelay: `${navLinks.length * 0.1}s`,
                }}
              >
                <AppointmentButton />
              </div>
            )}

            {session ? (
              <button
                onClick={() => signOut()}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
