"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  const session = useSession();


  return (
    <div className="mt-20 px-4 md:px-20 flex flex-col items-center space-y-6 sm:h-screen">
      {/* Welcome Header */}
      <div className="text-center">
        <h1>Welcome,<span className="text-xl font-bold text-gray-800 ml-2">{session.data?.user.email}</span> </h1>
        <p className="text-gray-500 my-3">Here is your dashboard at a PatientPlus:</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link href="/myAppoinments">
          <div className="bg-lime-600 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-lime-700 cursor-pointer">
            <h2 className="text-lg font-bold">My Appointments</h2>
            <p className="text-sm">View and manage your upcoming and past appointments.</p>
          </div>
        </Link>
        <Link href="/Dashboard/user/api/PaymentHistory">
          <div className="bg-emerald-500 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-emerald-600 cursor-pointer">
            <h2 className="text-lg font-bold">Payment History</h2>
            <p className="text-sm">Track your payments and download receipts.</p>
          </div>
        </Link>
        <Link href="/AddReview">
          <div className="bg-orange-600 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-orange-700 cursor-pointer">
            <h2 className="text-lg font-bold">Add Review</h2>
            <p className="text-sm">Share feedback about your experience with the hospital.</p>
          </div>
        </Link>
      </div>

      {/* Activity Timeline */}
      <div className="w-full max-w-4xl mt-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">A</div>
            <div className="ml-4">
              <p className="text-gray-800">You booked an appointment with Dr. Smith.</p>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">P</div>
            <div className="ml-4">
              <p className="text-gray-800">Payment of $200 was successful for your last visit.</p>
              <span className="text-gray-500 text-sm">5 days ago</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
