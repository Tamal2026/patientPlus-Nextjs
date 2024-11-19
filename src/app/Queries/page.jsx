"use client"
import React, { useState } from 'react';

const faqs = [
  {
    question: "What services does your hospital offer?",
    answer: "We offer a wide range of services, including cardiology, neurology, pediatrics, surgery, and emergency care.",
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book an appointment through our online website  or by calling our front desk.",
  },
  {
    question: "Do you accept health insurance?",
    answer: "Yes, we accept most major health insurance plans. Please contact us for specific details.",
  },
  {
    question: "What are your hospital’s visiting hours?",
    answer: "Our visiting hours are from 10:00 AM to 8:00 PM daily. Special cases may allow for extended visits.",
  },
  {
    question: "How can I get in touch with a specialist?",
    answer: "You can find specialist information on our website and book directly or through our help desk.",
  },
];

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-10 px-4 md:px-8 lg:px-16 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md shadow-sm bg-white overflow-hidden"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-lg font-medium">{faq.question}</h2>
              <span className="text-xl">
                {activeIndex === index ? '-' : '+'}
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? 'max-h-[200px] p-4'
                  : 'max-h-0 overflow-hidden'
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
