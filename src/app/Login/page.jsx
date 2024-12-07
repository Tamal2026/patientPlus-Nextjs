/* eslint-disable @next/next/no-img-element */
"use client";

import SocialLogin from "@/components/Shared/SocialLogin/page";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
     
    } else {
      console.error("Login failed:", res.error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-500 to-emerald-800 items-center justify-center">
        <img
          src="https://i.ibb.co.com/f1Tzqtv/login-nextjs.jpg"
          alt="Login Illustration"
          className="animate-fade-in w-3/4 h-auto rounded-lg mt-20 shadow-lg"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

          {/* Attach handleLogin to the form's onSubmit */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-black rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                className="w-full px-4 py-2 border border-black rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit" // Ensure the button type is submit
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          <SocialLogin></SocialLogin>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <a href="/SignUp" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
