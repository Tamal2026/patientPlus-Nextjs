/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Page() {
  const [formData, setFormData] = useState({
    title: "",
    highlight: "",
    description: "",
    date: "",
    img: null,
  });
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });

      // Image preview Showing
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      if (file) reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataForImg = new FormData();
      formDataForImg.append("image", formData.img);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=948117b46e1316de1603c7c07a2e5ec6`,
        {
          method: "POST",
          body: formDataForImg,
        }
      );

      const imgBBData = await response.json();

      if (!imgBBData.success) {
        Swal.fire({
          icon: "warning",
          title: "Image upload failed",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSubmitting(false);
        return;
      }

      const imageUrl = imgBBData.data.url;

      const dataToSend = {
        title: formData.title,
        highlight: formData.highlight,
        description: formData.description,
        date: formData.date,
        imageUrl,
      };

      const backendResponse = await fetch(
        "http://localhost:3000/Dashboard/admin/api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (backendResponse.ok) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Blog successfully uploaded",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset the form and preview
        setFormData({
          title: "",
          highlight: "",
          description: "",
          date: new Date().toISOString().split("T")[0], // Reset date to today
          img: null,
        });
        setPreview(null);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Failed to upload blog",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
        showConfirmButton: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-5 border rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
     <div className="flex justify-between">
     <h2 className="text-3xl font-bold mb-5 text-center text-gray-800 animate-fadeIn">
        Add New Blog
      </h2>
     <div>
    <Link href={"/Dashboard/admin"}>   <button className="text-md bg-gray-600 text-white font-bold btn text-center  animate-fadeIn"> <FaHome></FaHome>
       Dashboard
      </button></Link>
     </div>
     </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 transform hover:scale-105"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="highlight"
          >
            Highlight
          </label>
          <input
            type="text"
            id="highlight"
            name="highlight"
            value={formData.highlight}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 transform hover:scale-105"
            placeholder="Enter highlight"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 transform hover:scale-105"
            placeholder="Enter description"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="date"
          >
            Date
          </label>
          <input
            readOnly
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 transform hover:scale-105"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="img"
          >
            Image
          </label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 transform hover:scale-105"
          />
          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-auto mx-auto max-h-52 object-fill rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-2 px-4 rounded-lg ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition-transform duration-300 transform hover:scale-105`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
