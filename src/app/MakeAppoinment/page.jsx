"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const categories = [
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

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  extraProps = {},
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      {...extraProps}
      className="w-full border border-gray-300 rounded-md p-2"
    />
  </div>
);

const DoctorCard = ({ doctor, selected, onSelect }) => (
  <li
    className={`p-2 border rounded-md cursor-pointer ${
      selected ? "bg-blue-100 border-blue-400" : "border-gray-300"
    }`}
    onClick={() => onSelect(doctor)}
  >
    <p className="font-medium">{doctor.name}</p>
    <p className="text-sm text-gray-600">{doctor.specialist}</p>
    <p className="text-sm text-gray-500">${doctor.price}</p>
  </li>
);


export default function AppointmentForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: session?.user?.email,
    phone: "",
    date: "",
    time: "",
    reason: "",
    selectedCategory: "",
    selectedDoctor: "",
    selectedDoctorPrice: "",
  });
 
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategory: e.target.value,
      selectedDoctor: "",
      selectedDoctorPrice: "",
    }));
  };

  const handleDoctorSelection = (doctor) => {
    setFormData((prev) => ({
      ...prev,
      selectedDoctor: doctor.name,
      selectedDoctorPrice: doctor.price,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Confirm Appointment?",
      text: "Do you want to proceed to payment for this appointment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    // Save the form data to local storage
    localStorage.setItem("appointmentData", JSON.stringify(formData));

    // Redirect to the payments page
    router.push("/Payments");
  };

  const selectedCategory = categories.find(
    (category) => category.title === formData.selectedCategory
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md sm:max-w-lg lg:max-w-xl mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Book an Appointment
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Patient Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          readOnly
          value={session?.user?.email || ""}
          onChange={handleChange}
          required
        />

        <InputField
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

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
            {categories.map((category) => (
              <option key={category.title} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="mb-4">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Available Doctors:
            </h3>
            <ul className="space-y-2">
              {selectedCategory.expertise.map((doctor) => (
                <DoctorCard
                  key={doctor.name}
                  doctor={doctor}
                  selected={formData.selectedDoctor === doctor.name}
                  onSelect={handleDoctorSelection}
                />
              ))}
            </ul>
          </div>
        )}

        <InputField
          label="Appointment Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <InputField
          label="Appointment Time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          extraProps={{ min: "10:00", max: "22:00" }}
        />

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
          className="w-full
            bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
