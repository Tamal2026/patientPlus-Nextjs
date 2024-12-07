"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AppointmentForm() {
  const router = useRouter();
  const { id: doctorName } = router.query;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
  });

  useEffect(() => {
    if (doctorName) {
      setFormData((prev) => ({
        ...prev,
        doctor: decodeURIComponent(doctorName),
      }));
    }
  }, [doctorName]);

  if (!router.isReady) {
    return <div>Loading...</div>; 
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = {
      email: formData.email,
      name: formData.name,
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
      symptoms: formData.symptoms,
    };

    const resp = await fetch(
      "http://localhost:3000/Appoinment/api/newAppoinment",
      {
        method: "POST",
        body: JSON.stringify(newAppointment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   
  };

  return (
    <div className="container mx-auto py-10 px-4 mt-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg shadow-sm"
            placeholder="Enter patient full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg shadow-sm"
            placeholder="Enter your email"
          />
        </div>

        {/* Doctor Name */}
        <div>
          <label htmlFor="doctor" className="block text-gray-700">
            Doctor Name
          </label>
          <input
            type="text"
            id="doctor"
            name="doctor"
            value={formData.doctor}
            readOnly
            className="w-full p-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label htmlFor="date" className="block text-gray-700">
            Choose a Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* Appointment Time */}
        <div>
          <label htmlFor="time" className="block text-gray-700">
            Choose a Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* Symptoms/Reason for Visit */}
        <div>
          <label htmlFor="symptoms" className="block text-gray-700">
            Reason for Appointment
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg shadow-sm"
            placeholder="Describe your symptoms or reason for visit"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
