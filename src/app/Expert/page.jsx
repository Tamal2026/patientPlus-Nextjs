/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]); // State to store services data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/ServicesApi/api/get-all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.services);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Meet Our Experts</h1>
      {loading && <h1>Please wait...</h1>}
      {data.map((service, index) => (
        <div key={index} className="mb-10 border-b pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-2xl mx-auto">
            {service.expertise.map((expert, expertIndex) => (
              <div
                key={expertIndex}
                className="relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition group"
              >
                <img
                  src={expert.img}
                  alt={expert.name}
                  className="w-full h-52 object-fill rounded-t-lg mb-3"
                />
                <h4 className="font-bold text-lg">{expert.name}</h4>
                <p className="text-sm text-gray-500">{expert.specialist}</p>
                <p className="text-sm text-gray-600">{expert.degree}</p>
                <p className="text-sm mb-10">{expert.short_desc}</p>

              
               
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
