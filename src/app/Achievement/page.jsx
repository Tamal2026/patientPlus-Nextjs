"use client"
import React, { useEffect, useState } from "react";

export default function Page() {
  const [counts, setCounts] = useState({
    medicalExperts: 0,
    hospitalRooms: 0,
    awardsWon: 0,
    happyPatients: 0,
  });

  const targets = {
    medicalExperts: 50,
    hospitalRooms: 300,
    awardsWon: 500,
    happyPatients: 5000,
  };

  useEffect(() => {
    const updateCount = (key, target) => {
      let count = 0;
      const interval = setInterval(() => {
        count += Math.ceil(target / 100); // Increment smoothly
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        setCounts((prev) => ({ ...prev, [key]: count }));
      }, 20); // Speed of animation
    };

    for (const key in targets) {
      updateCount(key, targets[key]);
    }
  }, []);

  return (
    <div className="bg-gray-800 text-white py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 text-center">
        <div className="flex flex-col items-center">
          <i className="text-5xl mb-4">👨‍⚕️</i>
          <h3 className="text-4xl font-extrabold">{counts.medicalExperts}</h3>
          <p className="text-lg font-medium mt-2">Medical Experts</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="text-5xl mb-4">🛏️</i>
          <h3 className="text-4xl font-extrabold">{counts.hospitalRooms}</h3>
          <p className="text-lg font-medium mt-2">Hospital Rooms</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="text-5xl mb-4">💎</i>
          <h3 className="text-4xl font-extrabold">{counts.awardsWon}</h3>
          <p className="text-lg font-medium mt-2">Awards Won</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="text-5xl mb-4">😊</i>
          <h3 className="text-4xl font-extrabold">{counts.happyPatients}</h3>
          <p className="text-lg font-medium mt-2">Happy Patients</p>
        </div>
      </div>
    </div>
  );
}
