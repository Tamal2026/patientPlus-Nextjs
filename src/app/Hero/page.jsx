"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const slides = [
  {
    img: "https://i.ibb.co.com/qgqyypD/docto.png",
    title: "Expert Team",
    message: "We have a team of highly skilled professionals.",
  },
  {
    img: "https://i.ibb.co.com/XkPfL9w/child-care.jpg",
    title: "Child Care",
    message: "Providing excellent care for your little ones.",
  },
  {
    img: "https://i.ibb.co.com/fxfjqtC/newborn-baby.jpg",
    title: "Newborn Care",
    message: "Specialized care for newborns in a safe environment.",
  },
];

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setSlideDirection(currentSlide % 2 === 0 ? "left" : "right");

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFade(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative max-w-screen-2xl h-screen overflow-hidden">
      <div
        className={`absolute inset-0 bg-contain  bg-no-repeat bg-center transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${slides[currentSlide].img})`,
        }}
      ></div>

      <div
        className={`relative flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50 transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1
          className={`text-4xl md:text-6xl font-bold mb-4 transition-transform duration-1000 ${
            slideDirection === "left"
              ? fade
                ? "-translate-x-full"
                : "translate-x-0"
              : fade
              ? "translate-x-full"
              : "translate-x-0"
          }`}
        >
          {slides[currentSlide].title}
        </h1>
        <p
          className={`text-lg md:text-2xl mb-6 transition-transform duration-1000 ${
            slideDirection === "left"
              ? fade
                ? "-translate-x-full"
                : "translate-x-0"
              : fade
              ? "translate-x-full"
              : "translate-x-0"
          }`}
        >
          {slides[currentSlide].message}
        </p>
        <Link href={"/Service"}>
          {" "}
          <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
}
