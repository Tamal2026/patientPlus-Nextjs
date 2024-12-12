import Image from "next/image";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const ServiceDetailsPage = async ({ params }) => {
  // Fetch service details based on the dynamic ID
  const res = await fetch(` ${process.env.NEXT_PUBLIC_BASE_URL}/ServicesApi/api/${params.id}`, {
    cache: "no-store", // Ensures fresh data in dynamic routes
  });

  // Handle non-OK response
  if (!res.ok) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-500">Error</h1>
          <p>Failed to load service details.</p>
        </div>
      </div>
    );
  }

  const data = await res.json();

  return (
    <div className="mt-10 mx-4 sm:mx-6 md:mx-8 lg:mx-auto lg:w-9/12">
      {data?.service ? (
        <>
          {/* Service Image and Details */}
          <img
            src={data.service.img}
            alt={data.service.title}
            className="w-full h-[700px] rounded-lg object-cover"
          />
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 mt-4 text-center">
            {data.service.title}
          </p>
          <hr className="my-4" />
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-8">
            <span className="font-semibold">Description:</span>{" "}
            {data.service.description}
          </p>
          <hr />

          {/* Experts Section */}
          <h1 className="text-2xl font-bold my-5 text-center bg-blue-500 p-3 text-white w-1/6 mx-auto rounded-lg sm:w-1/2">
            Experts
          </h1>

          {/* Expert Cards with Animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.service.expertise?.map((expert, index) => (
              <div
                key={index}
                className="text-center transform my-5 shadow-2xl transition duration-300 hover:scale-105 hover:shadow-lg p-4 rounded-lg bg-white"
              >
                <img
                  alt={`Expert ${expert.name}`}
                  src={expert.img}
                  className="rounded-badge h-40 w-40 mx-auto object-cover mb-4 transition duration-300 hover:scale-110"
                />
                <p className="mt-2 text-lg font-semibold text-gray-800">
                  {expert.name}
                </p>
                <p className="text-sm text-gray-500">{expert.specialist}</p>
                <p className="text-xs text-gray-400">{expert.degree}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No service details found.</p>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
