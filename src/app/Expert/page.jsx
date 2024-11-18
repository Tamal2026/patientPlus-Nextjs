/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]); // State to store services data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/ServicesApi/api/get-all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.services); // Set the services array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>; // Show loading indicator while data is being fetched

  return (
    <div className="mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Our Services</h1>
      <h3 className="font-bold text-lg mb-3">Meet Our Experts:</h3>
      {data.map((service) => (
        <div key={service._id} className="mb-10 border-b pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-2xl mx-auto">
            {service.expertise.map((expert, index) => (
              <div
                key={index}
                className="relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition group"
              >
                <img
                  src={expert.img}
                  alt={expert.name}
                  className="w-full h-52 object-cover rounded-t-lg mb-3"
                />
                <h4 className="font-bold text-lg">{expert.name}</h4>
                <p className="text-sm text-gray-500">{expert.specialist}</p>
                <p className="text-sm text-gray-600">{expert.degree}</p>
                <p className="text-sm mt-2">{expert.short_desc}</p>

                {/* Button to appear on hover */}
                <button className="bottom-4 left-4 hidden group-hover:block mt-5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition-transform translate-x-24 tr">
                  Make Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
