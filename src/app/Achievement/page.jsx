"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from "react";

export default function Page() {
  return (
    <div className="bg-gray-800 text-white py-10 my-5">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 text-center">
        <div className="flex flex-col items-center">
          <i className="text-5xl mb-4">👨‍⚕️</i>
          <h3 className="text-4xl font-extrabold">24</h3>
          <p className="text-lg font-medium mt-2">Medical Experts</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="text-5xl mb-4">🛏️</i>
          <h3 className="text-4xl font-extrabold">250</h3>
          <p className="text-lg font-medium mt-2">Hospital Rooms</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="text-5xl mb-4">💎</i>
          <h3 className="text-4xl font-extrabold">28</h3>
          <p className="text-lg font-medium mt-2">Awards Won</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="text-5xl mb-4">😊</i>
          <h3 className="text-4xl font-extrabold">2450</h3>
          <p className="text-lg font-medium mt-2">Happy Patients</p>
        </div>
      </div>
    </div>
  );
}
