"use client";

import Link from 'next/link';
import React from 'react';
import { FaUsers, FaCalendarAlt, FaPenAlt, FaTasks } from 'react-icons/fa';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      {/* Dashboard Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your users, appointments, and content efficiently.</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* All Users */}
        <Link href="/Dashboard/admin/AllUser">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-3xl" />
              <h2 className="text-lg font-semibold">All Users</h2>
            </div>
            <p className="text-sm mt-2">View and manage all registered users.</p>
          </div>
        </Link>

        {/* All Appointments */}
        <Link href="/Dashboard/admin/AllAppoinmets">
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-3xl" />
              <h2 className="text-lg font-semibold">All Appointments</h2>
            </div>
            <p className="text-sm mt-2">View and manage all appointments in the system.</p>
          </div>
        </Link>

        {/* Add Blog */}
        <Link href="/Dashboard/admin/api/AddBlog">
          <div className="bg-amber-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaPenAlt className="text-3xl" />
              <h2 className="text-lg font-semibold">Add Blog</h2>
            </div>
            <p className="text-sm mt-2">Create and publish new blog posts for users.</p>
          </div>
        </Link>
      </div>

      {/* Recent Activities Section */}
      <div className="mt-12 max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          <li className="flex items-start space-x-4">
            <div className="bg-blue-500 text-white h-10 w-10 rounded-full flex items-center justify-center">
              <FaUsers />
            </div>
            <div>
              <p className="text-gray-800">
                <span className="font-semibold">Admin added 5 new users</span> to the system.
              </p>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <div className="bg-green-500 text-white h-10 w-10 rounded-full flex items-center justify-center">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-gray-800">
                <span className="font-semibold">10 new appointments</span> were scheduled today.
              </p>
              <span className="text-gray-500 text-sm">4 hours ago</span>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <div className="bg-amber-500 text-white h-10 w-10 rounded-full flex items-center justify-center">
              <FaPenAlt />
            </div>
            <div>
              <p className="text-gray-800">
                <span className="font-semibold">A new blog post</span> was published by the admin.
              </p>
              <span className="text-gray-500 text-sm">6 hours ago</span>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <div className="bg-gray-500 text-white h-10 w-10 rounded-full flex items-center justify-center">
              <FaTasks />
            </div>
            <div>
              <p className="text-gray-800">
                <span className="font-semibold">System maintenance</span> was successfully completed.
              </p>
              <span className="text-gray-500 text-sm">8 hours ago</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
