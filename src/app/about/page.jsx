/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function Page() {
  return (
    <div className="container mx-auto py-10 px-4 my-20">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="path_to_your_image_here.jpg" 
            alt="Special Health Services"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 lg:pl-10">
          <h2 className="text-2xl font-bold mb-4">
            We are provided special health services
          </h2>
          <p className="text-gray-600 mb-8">
            Unlike traditional methods, you can see in real time what is or is not working for your business online.
          </p>

          {/* Services List */}
          <div className="space-y-6">
            <ServiceItem
              icon="📊"
              title="Bills & Insurance"
              description="Integer tincidunt justo eu blandit dictum. Sed euismod."
            />
            <ServiceItem
              icon="🩺"
              title="Cancer Screening"
              description="Integer tincidunt justo eu blandit dictum. Sed euismod."
            />
            <ServiceItem
              icon="💉"
              title="Cardiac Surgery"
              description="Unlike traditional methods, you can see in real time."
            />
            <ServiceItem
              icon="🧠"
              title="Neurology"
              description="Unlike traditional methods, you can see in real time what is or is not."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Service Item Component
function ServiceItem({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-blue-500 text-2xl">{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
