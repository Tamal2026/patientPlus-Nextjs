/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

export default function ServicesCard({ services }) {
  
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service._id} // Ensure the key is unique
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-60 object-fill rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {service.title}
            {service.price}
          </h3>
          <p className="text-gray-600">{service.description}</p>
          <Link href={`/services/${service._id}`}>
            <button className="bg-blue-500 text-white px-5 py-2 mt-4">
              Learn More
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
