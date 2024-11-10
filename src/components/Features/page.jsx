import React from 'react';

export default function Page() {
  const services = [
    {
      icon: '♻️',
      title: 'Location & Parking',
      description:
        "Consider whether the hospital’s location is safe and convenient for you, your family, friends, and advocate. Is the hospital accessible by public transportation?",
    },
    {
      icon: '🏨',
      title: 'Patient Rooms, Privacy, & Visitors',
      description:
        "Find out whether you will share a room and how your privacy will be maintained. Ask about the hospital’s policy on visitors to find out the hours.",
    },
    {
      icon: '🥗',
      title: 'Dietary Restrictions & Cafeteria',
      description:
        "Many people have restrictions on the food they eat. These may be for: Call the hospital you’re considering to find out how they will handle your dietary needs.",
    },
    {
      icon: '📄',
      title: 'Language Assistance',
      description:
        "By California law, all general acute care hospitals must provide language assistance services 24 hours per day in languages spoken by large segments of the community.",
    },
    {
      icon: '🛏️',
      title: 'Ombudsman Support',
      description:
        "An ombudsman is trained to help patients, family members, and hospital staff sort out problems early and quickly to bring about the best resolution.",
    },
    {
      icon: '🔗',
      title: 'Other Services',
      description:
        "In addition to the above services, every hospital has its own rules and policies, which may affect your stay. If you have any questions about the hospital you’re considering.",
    },
  ];

  return (
    <div className="p-6 sm:p-12 lg:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-start bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4 text-blue-500">{service.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
