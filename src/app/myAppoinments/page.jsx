"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/myAppoinments/api/${session?.user?.email}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();

   
        setBookings(data?.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, [session]);

  return (
    <div className="mt-20 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Doctor Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookings) && bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.doctor}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.time}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
