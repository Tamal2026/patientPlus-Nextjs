"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
  {
    title: "Cancer Screening",
    img: "https://i.ibb.co.com/WkqvkZG/cancer-screening.webp",
    expertise: [
      { name: "Dr. Olivia Brown", specialist: "Oncologist", price: "120.80" },
      { name: "Dr. Ethan Moore", specialist: "Radiologist", price: "122.45" },
      { name: "Dr. Sophia Hall", specialist: "Pathologist", price: "135.65" },
      {
        name: "Dr. Daniel Wilson",
        specialist: "Hematologist",
        price: "127.40",
      },
    ],
  },
  {
    title: "Orthopedics",
    img: "https://i.ibb.co.com/orthopedics-image.jpg",
    expertise: [
      {
        name: "Dr. Robert James",
        specialist: "Orthopedic Surgeon",
        price: "50.45",
      },
      {
        name: "Dr. Lisa White",
        specialist: "Sports Medicine Specialist",
        price: "75.45",
      },
      {
        name: "Dr. Charles Green",
        specialist: "Pediatric Orthopedic Surgeon",
        price: "40.45",
      },
      {
        name: "Dr. Emily Brown",
        specialist: "Orthopedic Rehabilitation Specialist",
        price: "55.25",
      },
    ],
  },
  {
    title: "Pediatrics",
    img: "https://i.ibb.co.com/pediatrics-image.jpg",
    expertise: [
      { name: "Dr. Anna Clark", specialist: "Pediatrician", price: "45.50" },
      {
        name: "Dr. William Lee",
        specialist: "Pediatric Cardiologist",
        price: "75.15",
      },
      {
        name: "Dr. Elizabeth Turner",
        specialist: "Pediatric Endocrinologist",
        price: "68.25",
      },
      {
        name: "Dr. Michael Johnson",
        specialist: "Pediatric Neurologist",
        price: "60.00",
      },
    ],
  },
];
// Other categories...

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
  const router = useRouter();

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
        if (response.ok) {
          router.push("/Payments");
        }

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
          type="button"
          onClick={() =>
            router.push(`/Payments?price=${formData.selectedDoctorPrice}`)
          }
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
