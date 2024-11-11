"use client";

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
      console.log("Login successful");
    } else {
      console.error("Login failed:", res.error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center">
        <img
          src="https://via.placeholder.com/500x500"
          alt="Login Illustration"
          className="animate-fade-in w-3/4 h-auto rounded-lg shadow-lg"
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

          <div className="mt-6 text-center">
            <button className="flex items-center justify-center w-full py-2 border rounded-md hover:bg-gray-100 transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </button>
          </div>

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
