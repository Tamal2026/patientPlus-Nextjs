"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import Swal from "sweetalert2";

export default function MyAppointments() {
  const [bookings, setBookings] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/myAppoinments/api/${session?.user?.email}`
        );

        const data = await res.json();

        setBookings(data?.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, [session]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this Appoinment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancle it!",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:3000/myAppoinments/api/deleteAppoinment/${id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          setBookings((prev) => prev.filter((booking) => booking._id !== id));
          Swal.fire("Deleted!", "Your has been cancled.", "success");
        } else {
          throw new Error("Failed to delete booking");
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
        Swal.fire("Error!", "Failed to delete booking.", "error");
      }
    }
  };

  return (
    <div className="mt-20 px-4">
      <div className="flex gap-10 items-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          My Appoinments
        </h2>
        <Link href={"/Dashboard/user"}>
          {" "}
          <button className="flex items-center gap-1 bg-orange-600 text-white font-semibold px-3 py-1 rounded-lg">
            <FaHome></FaHome>
            <h1>Dashboard</h1>
          </button>
        </Link>
      </div>
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
                    {booking.selectedDoctor}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.time}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center flex items-center gap-10">
                    <Link
                      href={{
                        pathname: "/Appoinment/update",
                        query: {
                          id: booking._id,
                          doctor: booking.doctor,
                          date: booking.date,
                          time: booking.time,
                          symptoms: booking.symptoms,
                        },
                      }}
                    >
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
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
