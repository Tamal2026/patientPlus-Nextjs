import React from 'react';

export default function Footer() {
  return (
    <div className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and description */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              {/* Icon or logo goes here */}
              <span className="text-white text-xl">💼</span>
            </div>
            <h2 className="text-2xl font-semibold">Doctoral</h2>
          </div>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum augue quis augue ornare, eget faucibus felis pharetra.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500">Facebook</a>
            <a href="#" className="text-red-500">YouTube</a>
            <a href="#" className="text-blue-400">Twitter</a>
          </div>
        </div>

        {/* Our Services */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#">Bills & Insurance</a></li>
            <li><a href="#">Cancer Screening</a></li>
            <li><a href="#">Cardiac Surgery</a></li>
            <li><a href="#">Neurology</a></li>
          </ul>
        </div>

        {/* Specialist Doctors */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Specialist Doctors</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#">Larry Schmidt</a></li>
            <li><a href="#">Roger Schneider</a></li>
            <li><a href="#">Theresa Hamilton</a></li>
            <li><a href="#">Brittany Robertson</a></li>
            <li><a href="#">Raymond Payne</a></li>
          </ul>
        </div>

        {/* The Heart Of Clinic */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">The Heart Of Clinic</h3>
          <p className="text-sm mb-4">
            Dr. Jonathan Barnes <br />
            Chief Medical Officer <br />
            1-800-1234-567
          </p>
          <p className="text-sm mb-4">
            Aliquam orci nullam tempor sapien orci gravida donec enim ipsum porta justo integer at velna vitae auctor integer congue.
          </p>
          <a href="#" className="text-blue-500">Learn More</a>
        </div>
      </div>

      <div className="bg-gray-900 py-4 text-center text-sm">
        <p>Copyright © 2024. All Rights Reserved. Made with ❤️ by ThemePerch.</p>
      </div>
    </div>
  );
}
