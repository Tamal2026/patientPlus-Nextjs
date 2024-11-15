/* eslint-disable @next/next/no-img-element */
"use client";
import { getServices } from "@/services/getServices";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHeartbeat,
  FaStethoscope,
  FaNotesMedical,
  FaHandsWash,
} from "react-icons/fa";

export default function Page() {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true); 
        const data = await getServices();
        console.log("Fetched Data:", data.services);
        setServicesData(data.services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchServices();
  }, []);

  const servicesInfo = [
    {
      icon: <FaHeartbeat className="text-blue-600 text-3xl" />,
      title: "Hearing Tests & Aids",
      description:
        "Unlike traditional methods, you can see in real-time what is or is not working for your business online.",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-3xl" />,
      title: "Paediatric & Adult Audiology",
      description:
        "Unlike traditional methods, you can see in real-time what is or is not working for your business online.",
    },
    {
      icon: <FaNotesMedical className="text-blue-600 text-3xl" />,
      title: "Provision & Servicing of Hearing Instruments",
      description:
        "Unlike traditional methods, you can see in real-time what is or is not working for your business online.",
    },
    {
      icon: <FaHandsWash className="text-blue-600 text-3xl" />,
      title: "Good Health Habits Can Help Stop Germs",
      description:
        "Unlike traditional methods, you can see in real-time what is or is not working for your business online.",
    },
  ];

  return (
    <>
      <div className="container my-20 mx-auto px-4 py-8 lg:flex lg:items-center lg:space-x-12">
        <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src="https://i.ibb.co.com/ZG0PCZb/doctor.png"
            alt="Doctor"
            className="w-64 lg:w-3/4 object-cover"
          />
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Doctoral Specialist hearing services are provided
          </h2>
          <p className="text-gray-600 mb-6">
            Specialist hearing services are provided through our partners
            Audiomax.
          </p>

          <div className="space-y-4">
            {servicesInfo.map((service, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg shadow-md hover:bg-blue-50 transition duration-300"
              >
                <div className="flex-shrink-0">{service.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render fetched data dynamically */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-60 object-fill rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <h3 className="text-md  text-gray-800 mb-2">
                {service.short_desc}
              </h3>
             
              <Link href={`/ServiceDetailsPage/${service._id}`}>
                <button className="bg-blue-500 text-white px-5 py-2 my-5">
                  Learn More
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
