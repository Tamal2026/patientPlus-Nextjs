"use client";

import React, { useEffect, useState } from "react";

export default function Page() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(` ${process.env.NEXT_PUBLIC_BASE_URL}/AllAppoinmentsAdmin/api`);
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
    
        setAppointments(data.appoinments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  if (appointments.length === 0) {
    return <div className="mt-20 text-center">No appointments available.</div>;
  }

  return (
    <div className="mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Appointments</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Patient Name</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Doctor</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{appointment.name}</td>
                <td className="border px-4 py-2">{appointment.phone}</td>
                <td className="border px-4 py-2">{appointment.selectedDoctor}</td>
                <td className="border px-4 py-2">{appointment.date}</td>
                <td className="border px-4 py-2 capitalize">
                  {appointment.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
