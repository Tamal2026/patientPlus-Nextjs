// src/components/AppointmentForm.js
"use client";
import React, { useState } from "react";

const data = [
  {
    title: "Neurology",
    img: "https://i.ibb.co.com/JdsbHyF/neurology.jpg",
    expertise: [
      { name: "Dr. Jane Doe", specialist: "Neurologist" },
      { name: "Dr. John Smith", specialist: "Neurosurgeon" },
      { name: "Dr. Emily Clark", specialist: "Pediatric Neurologist" },
      { name: "Dr. Alan Brown", specialist: "Neurophysiologist" },
    ],
  },
  {
    title: "Cardiac Surgery",
    img: "https://i.ibb.co.com/52PYtGx/cardiac-surgery-open-chest-heart-procedure-1168612-352239.png",
    expertise: [
      { name: "Dr. Michael Lee", specialist: "Cardiothoracic Surgeon" },
      { name: "Dr. Sarah Johnson", specialist: "Cardiac Anesthesiologist" },
      { name: "Dr. Kevin Wong", specialist: "Cardiologist" },
      { name: "Dr. Laura Adams", specialist: "Perfusionist" },
    ],
  },
  {
    title: "Cancer Screening",
    img: "https://i.ibb.co.com/WkqvkZG/cancer-screening.webp",
    expertise: [
      { name: "Dr. Olivia Brown", specialist: "Oncologist" },
      { name: "Dr. Ethan Moore", specialist: "Radiologist" },
      { name: "Dr. Sophia Hall", specialist: "Pathologist" },
      { name: "Dr. Daniel Wilson", specialist: "Hematologist" },
    ],
  },
  {
    title: "Orthopedics",
    img: "https://i.ibb.co.com/orthopedics-image.jpg",
    expertise: [
      { name: "Dr. Robert James", specialist: "Orthopedic Surgeon" },
      { name: "Dr. Lisa White", specialist: "Sports Medicine Specialist" },
      { name: "Dr. Charles Green", specialist: "Pediatric Orthopedic Surgeon" },
      {
        name: "Dr. Emily Brown",
        specialist: "Orthopedic Rehabilitation Specialist",
      },
    ],
  },
  {
    title: "Pediatrics",
    img: "https://i.ibb.co.com/pediatrics-image.jpg",
    expertise: [
      { name: "Dr. Anna Clark", specialist: "Pediatrician" },
      { name: "Dr. William Lee", specialist: "Pediatric Cardiologist" },
      { name: "Dr. Elizabeth Turner", specialist: "Pediatric Endocrinologist" },
      { name: "Dr. Michael Johnson", specialist: "Pediatric Neurologist" },
    ],
  },
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      selectedCategory: e.target.value,
      selectedDoctor: "",
    });
  };

  const handleDoctorSelection = (doctorName) => {
    setFormData({ ...formData, selectedDoctor: doctorName });
  };

  const selectedCategoryData = data.find(
    (item) => item.title === formData.selectedCategory
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAppoinment = {
      email: formData.email,
      name: formData.name,
      category: formData.selectedCategory,
      doctor: formData.selectedDoctor,
      date: formData.date,
      time: formData.time,
      symptoms: formData.symptoms,
    };
    const resp = await fetch(
      "http://localhost:3000/Appoinment/api/newAppoinment",
      {
        method: "POST",
        body: JSON.stringify(newAppoinment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(resp);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Book an Appointment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Name
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
            value={formData.email}
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
                    onClick={() => handleDoctorSelection(doctor.name)}
                  >
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialist}</p>
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
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="reason"
          >
            Reason for Appointment
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
