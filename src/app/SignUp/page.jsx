/* eslint-disable @next/next/no-img-element */
"use client";

import Swal from "sweetalert2";

export default function SignupPage() {

  
  const handleSignUp = async (event) => {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const newUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const res = await fetch('http://localhost:3000/SignUp/api', {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
  if(data.result.insertedId){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
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
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-2 border border-black rounded-md "
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="w-full border-black px-4 py-2 border rounded-md "
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                className="w-full border-black px-4 py-2 border rounded-md "
                placeholder="Enter your password"
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

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-500 to-blue-600 items-center justify-center">
        <img
          src="https://via.placeholder.com/500x500"
          alt="Signup Illustration"
          className="animate-fade-in w-3/4 h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
