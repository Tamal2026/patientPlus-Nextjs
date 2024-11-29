"use client"

import React, { useState } from 'react';

export default function ReviewPage() {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(''); 

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.trim()) {
      setMessage('Review cannot be empty.');
      return;
    }

    try {
      const response = await fetch('/AddReview/api', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review, rating }),
      });

      if (response.ok) {
        setMessage('Review submitted successfully!');
        setReview(''); // Clear the input field
        setRating(0); // Reset the star rating
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to submit review.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="mt-20 p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add a Review</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className="flex items-center mb-4">
          <span className="mr-2">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`px-1 text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
