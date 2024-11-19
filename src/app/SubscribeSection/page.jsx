import React from 'react';

export default function Page() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-60 md:h-80 lg:h-96 flex items-center justify-center text-center"
      style={{ backgroundImage: 'url(https://i.ibb.co.com/HYfjK4Z/subcs.webp)' }} 
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-screen-md">
        <h2 className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold">
          I’m Ready to Help You
        </h2>
        <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
          Subscribe for Monthly Health Tips
        </h3>

        {/* Subscription form */}
        <form className="mt-6 flex justify-center items-center">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-md font-medium hover:bg-blue-700 transition duration-300"
          >
            SUBSCRIBE NOW
          </button>
        </form>
      </div>
    </div>
  );
}
