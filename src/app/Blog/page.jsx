// pages/index.js
import Image from 'next/image';
import React from 'react';

export default function Page() {
  // Dummy data for posts
  const posts = [
    {
      id: 1,
      image: '', // Replace with actual image URL or path
      title: 'Good Health Habits Can Help Stop Germs',
      date: 'Jun 15, 2024',
      author: 'Dr. Jones',
      comments: 3,
      description:
        'Integer tincidunt justo eu blandit dictum. Sed euismod, justo sit amet finibus iaculis, odio lectus finibus magna, non lobortis tellus massa quis arcu. Aenean ante diam, ultricies id turpis vel, tristique bibendum augue.',
    },
    {
      id: 2,
      image: '', // Replace with actual image URL or path
      title: 'Important Tips for Your Health and Better Living',
      date: 'Jun 15, 2024',
      author: 'Dr. Jones',
      comments: 0,
      description:
        'Integer tincidunt justo eu blandit dictum. Sed euismod, justo sit amet finibus iaculis, odio lectus finibus magna, non lobortis tellus massa quis arcu. Aenean ante diam, ultricies id turpis vel, tristique bibendum augue.',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row px-4 py-6 gap-8 my-20">
      {/* Left Section: Blog Cards */}
      <div className="w-full md:w-2/3 space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-6"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/3">
              <Image width={200} height={200} src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            {/* Content Section */}
            <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                  <span className="flex items-center space-x-1">
                    <span className="material-icons">chat_bubble_outline</span>
                    <span>{post.comments}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="material-icons">calendar_today</span>
                    <span>{post.date}</span>
                  </span>
                  <span>By {post.author}</span>
                </div>
                <p className="text-gray-700 mb-4">{post.description}</p>
              </div>
              <button className="text-blue-600 hover:underline self-start">Read More</button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section: Sidebar */}
      <div className="w-full md:w-1/3 space-y-6">
        {/* Search Box */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Search</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 p-2 rounded-l"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r">Search</button>
          </div>
        </div>

        {/* Our Services */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-blue-600">
            <li className="hover:underline cursor-pointer">Bills & Insurance</li>
            <li className="hover:underline cursor-pointer">Cancer Screening</li>
            <li className="hover:underline cursor-pointer">Cardiac Surgery</li>
            <li className="hover:underline cursor-pointer">Neurology</li>
          </ul>
        </div>

        {/* Archives */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Archives</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:underline cursor-pointer">June 2024</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:underline cursor-pointer">Health</li>
            <li className="hover:underline cursor-pointer">Medical care</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
