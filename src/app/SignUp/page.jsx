/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn } from "next-auth/react"; // Import signIn from next-auth
import { useRouter } from "next/navigation"; // Use useRouter for navigation
import Swal from "sweetalert2";

export default function SignupPage() {
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://localhost:3000/SignUp/api", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.result.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Automatically sign in the user
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email: newUser.email,
          password: newUser.password,
        });

        if (signInResponse.ok) {
          router.push("/"); // Navigate to the home page
        } else {
          Swal.fire({
            icon: "error",
            title: "Sign in failed",
            text: "Please try logging in manually.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Sign Up Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Please try again later.",
      });
      console.error("Sign Up Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create an Account
          </h1>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-2 border border-black rounded-md"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="w-full border-black px-4 py-2 border rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                className="w-full border-black px-4 py-2 border rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/Login" className="text-purple-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-500 to-emerald-800 items-center justify-center">
        <img
          src="https://i.ibb.co.com/gvc4YKm/sigup.webp"
          alt="Signup Illustration"
          className="animate-fade-in w-3/4 h-auto rounded-lg shadow-lg mt-20"
        />
      </div>
    </div>
  );
}
