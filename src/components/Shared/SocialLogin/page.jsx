/* eslint-disable @next/next/no-img-element */

import { signIn } from "next-auth/react";


export default function SocialLogin() {
   
  const handleSignIn = async (provider) => {
    const res = await signIn(provider,{redirect:false});
    console.log(res)
    
  };
  return (
    <div className="mt-6 text-center  w-1/2 mx-auto">
      <button
        onClick={() => handleSignIn("google")}
        className="flex items-center justify-center w-full py-2 border rounded-md hover:bg-gray-100 transition"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        Login with Google
      </button>
    </div>
  );
}
