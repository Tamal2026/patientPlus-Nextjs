"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

// Sample data for categories and doctors
const data = [
  {
    title: "Neurology",
    img: "https://i.ibb.co.com/JdsbHyF/neurology.jpg",
    expertise: [
      { name: "Dr. Jane Doe", specialist: "Neurologist", price: "25.45" },
      { name: "Dr. John Smith", specialist: "Neurosurgeon", price: "29.60" },
      {
        name: "Dr. Emily Clark",
        specialist: "Pediatric Neurologist",
        price: "35.75",
      },
      {
        name: "Dr. Alan Brown",
        specialist: "Neurophysiologist",
        price: "35.15",
      },
    ],
  },
  {
    title: "Cardiac Surgery",
    img: "https://i.ibb.co.com/52PYtGx/cardiac-surgery-open-chest-heart-procedure-1168612-352239.png",
    expertise: [
      {
        name: "Dr. Michael Lee",
        specialist: "Cardiothoracic Surgeon",
        price: "91.40",
      },
      {
        name: "Dr. Sarah Johnson",
        specialist: "Cardiac Anesthesiologist",
        price: "69.45",
      },
      { name: "Dr. Kevin Wong", specialist: "Cardiologist", price: "75.45" },
      { name: "Dr. Laura Adams", specialist: "Perfusionist", price: "80.25" },
    ],
  },
  // Other categories...
];

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
    selectedCategory: "",
    selectedDoctor: "",
    selectedDoctorPrice: "",
  });
  const session = useSession();
  const router = useRouter(); // Next.js router for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      selectedCategory: e.target.value,
      selectedDoctor: "",
      selectedDoctorPrice: "",
    });
  };

  const handleDoctorSelection = (doctor) => {
    setFormData({
      ...formData,
      selectedDoctor: doctor.name,
      selectedDoctorPrice: doctor.price,
    });
  };

  const selectedCategoryData = data.find(
    (item) => item.title === formData.selectedCategory
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation dialog
    const confirm = await Swal.fire({
      title: "Confirm Appointment?",
      text: "Do you want to book this appointment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      const newAppointment = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        category: formData.selectedCategory,
        doctor: formData.selectedDoctor,
      };

      try {
        const response = await fetch(
          "http://localhost:3000/Appoinment/api/newAppoinment",
          {
            method: "POST",
            body: JSON.stringify(newAppointment),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to book appointment");
        }

        Swal.fire({
          title: "Success!",
          text: "Your appointment has been booked.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          reason: "",
          selectedCategory: "",
          selectedDoctor: "",
          selectedDoctorPrice: "",
        });

        // Navigate to home page
        router.push("/");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "There was an error booking your appointment.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md sm:max-w-lg lg:max-w-xl mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Book an Appointment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Patient name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={session?.data?.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="category"
          >
            Select Category
          </label>
          <select
            id="category"
            name="selectedCategory"
            value={formData.selectedCategory}
            onChange={handleCategoryChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {data.map((category) => (
              <option key={category.title} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {formData.selectedCategory &&
          selectedCategoryData?.expertise.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Available Doctors:
              </h3>
              <ul className="space-y-2">
                {selectedCategoryData.expertise.map((doctor) => (
                  <li
                    key={doctor.name}
                    className={`p-2 border rounded-md cursor-pointer ${
                      formData.selectedDoctor === doctor.name
                        ? "bg-blue-100 border-blue-400"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleDoctorSelection(doctor)}
                  >
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialist}</p>
                    <p className="text-sm text-gray-500">${doctor.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="date"
          >
            Appointment Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="time"
          >
            Appointment Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            min="10:00"
            max="22:00"
            required
          />
          <p className="text-sm text-gray-500">
            Select a time between 10:00 AM and 10:00 PM
          </p>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="reason"
          >
            Reason for Visit
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-700">
            {formData.selectedDoctor &&
              `Selected Doctor: ${formData.selectedDoctor} - $${formData.selectedDoctorPrice}`}
          </p>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            disabled={
              !formData.selectedDoctor || !formData.date || !formData.time
            }
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
