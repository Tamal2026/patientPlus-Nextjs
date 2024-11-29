"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);




function CheckoutForm({ items }) {

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const searchParams = useSearchParams()
  const price = searchParams.get("price")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    // Create a payment intent on the server
    const response = await fetch("http://localhost:3000/Payments/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      console.error(
        "Error response from server:",
        response.status,
        await response.text()
      );
      setLoading(false);
      return;
    }

    const { clientSecret, error } = await response.json();
    if (error) {
      console.error("Error in payment intent:", error);
      setLoading(false);
      return;
    }

    // Confirm the card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error("Payment failed:", result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", result.paymentIntent);
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-6 animate-fadeIn transition-all"
    >
      <h3 className="text-lg font-semibold text-gray-700">
        Enter Payment Details
      </h3>
      <CardElement className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-md hover:shadow-lg transition transform hover:scale-105 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : `Pay ${price}`}
      </button>
      {success && (
        <p className="text-green-600 font-medium text-center mt-4 animate-pulse">
          Payment Successful! 🎉
        </p>
      )}
    </form>
  );
}

export default function Checkout({ items }) {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Complete Your Payment
            </h2>
            <p className="text-gray-500 mt-2">
              Securely process your payment using Stripe.
            </p>
          </div>
          <CheckoutForm items={items} />
        </div>
      </div>
    </Elements>
  );
}
