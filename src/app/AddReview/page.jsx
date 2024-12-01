"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const ReviewForm = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Display a toast notification
  const showToast = (icon, title, position = "top-end", timer = 3000) => {
    Swal.fire({
      toast: true,
      icon,
      title,
      position,
      timer,
      showConfirmButton: false,
    });
  };

  // Check if user is logged in and retrieve email
  const userEmail = session?.user?.email;

  if (status === "loading") {
    // Display a loading state or return null to avoid submitting without session data
    return <div>Loading...</div>;
  }

  if (!userEmail) {
    showToast("error", "You must be logged in to submit a review.");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.trim()) {
      showToast("error", "Review cannot be empty!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/AddReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review, rating, userEmail }),
      });

      if (response.ok) {
        const data = await response.json();
        showToast("success", data.message || "Review added successfully!");

        setReview("");
        setRating(0);

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        const errorData = await response.json();
        showToast("error", errorData.error || "Failed to submit your review.");
      }
    } catch (error) {
      console.error("Error occurred during review submission:", error);
      showToast("error", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-20 p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Add a Review</h1>
        <Link href={"/"}>
          <button className="flex items-center gap-1 btn bg-green-600 text-white mb-2">
            <FaHome></FaHome>Home
          </button>{" "}
        </Link>
      </div>
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
              key={star}
              type="button"
              className={`px-1 text-2xl ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
              disabled={isSubmitting}
            >
              ★
            </button>
          ))}
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
