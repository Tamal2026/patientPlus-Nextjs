"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function UpdateAppointmentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");
  const initialDate = searchParams.get("date");
  const initialTime = searchParams.get("time");
  const initialPhone = searchParams.get("phone");
  const initialSymptoms = searchParams.get("symptoms");

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    phone: "",
    symptoms: "",
  });

  useEffect(() => {
   
    setFormData({
      date: initialDate || "",
      time: initialTime || "",
      phone: initialPhone || "",
      symptoms: initialSymptoms || "",
    });
  }, [initialDate, initialTime, initialPhone, initialSymptoms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const userConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to update this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!userConfirmed.isConfirmed) {
      return; 
    }

    try {
      const response = await fetch(
        `http://localhost:3000/myAppoinments/api/deleteAppoinment/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update appointment.");
      }

     
      Swal.fire({
        title: "Success!",
        text: "Your appointment has been updated.",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/");
    } catch (error) {
      console.error("Error updating appointment:", error);

      // Error message with SweetAlert2
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating your appointment. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 w-full max-w-4xl transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Update Appointment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:ring-purple-500 focus:border-purple-500 sm:text-base"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:ring-purple-500 focus:border-purple-500 sm:text-base"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Field */}
            <div className="relative">
              <label
                htmlFor="date"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:ring-purple-500 focus:border-purple-500 sm:text-base"
                required
              />
            </div>

            {/* Time Field */}
            <div className="relative">
              <label
                htmlFor="time"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:ring-purple-500 focus:border-purple-500 sm:text-base"
                required
              />
            </div>
          </div>

          {/* Symptoms Field */}
          <div>
            <label
              htmlFor="symptoms"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Symptoms for Appointment
            </label>
            <textarea
              name="symptoms"
              id="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:ring-purple-500 focus:border-purple-500 sm:text-base"
              placeholder="Briefly describe the symptoms for your appointment"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-purple-600 hover:scale-105 transition-all"
            >
              Update Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
