/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts data from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          ` ${process.env.NEXT_PUBLIC_BASE_URL}/Blog/api`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Expected an array of posts");
        }

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 mt-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-600 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="text-center mb-8 text-4xl font-semibold bg-emerald-700 py-2 lg:w-1/4 rounded-lg mx-auto text-white">
        Blogs
      </h1>

      <div className="flex flex-col md:flex-row px-4 py-6 gap-8 my-20">
        {/* Left Section: Blog Cards */}
        <div className="w-full md:w-2/3 space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-6"
              >
                {/* Image Section */}
                <div className="w-full md:w-1/3">
                  <img
                    width={200}
                    height={200}
                    src={post.imageUrl || "/default-image.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Content Section */}
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                      <span className="flex items-center space-x-1">
                        <span>{post.comments}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>{post.date}</span>
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{post.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No posts available.</div>
          )}
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
              <button className="bg-blue-600 text-white px-4 rounded-r">
                Search
              </button>
            </div>
          </div>

          {/* Our Services */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul>
              <li className="hover:underline cursor-pointer">
                Bills & Insurance
              </li>

              <li className="hover:underline cursor-pointer">
                Cancer Screening
              </li>

              <li className="hover:underline cursor-pointer">
                Cardiac Surgery
              </li>

              <li className="hover:underline cursor-pointer">Neurology</li>

              <li className="hover:underline cursor-pointer">Orthopedics</li>

              <li className="hover:underline cursor-pointer">Pediatrics</li>
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

          {/* Recent Posts */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="flex items-center space-x-4">
                  <div className="w-1/4">
                    <img
                      width={200}
                      height={200}
                      src={post.imageUrl ? post.imageUrl : "/default-image.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/default-image.jpg";
                      }}
                    />
                  </div>
                  <div className="w-3/4">
                    <h4 className="text-sm font-semibold text-blue-600">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
