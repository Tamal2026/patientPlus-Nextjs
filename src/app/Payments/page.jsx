"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Correct import for app directory
import Swal from "sweetalert2";

// Load Stripe with the publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm({ appointmentData }) {
  const session = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter(); // Correct hook for app directory
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Stripe Error",
        text: "Stripe is not properly loaded. Please try again later.",
      });
    }

    const email = session?.data?.user?.email;

    try {
      const response = await fetch("/Payments/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...appointmentData,
          email,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "Unable to process payment. Please try again.",
        });
      }

      const { clientSecret, error } = await response.json();

      if (error) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: error,
        });
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
        });
      }

      if (result.paymentIntent.status === "succeeded") {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Your payment has been processed successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        setSuccess(true);

        // Redirect to the homepage
        router.push("/");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-700">
        Enter Payment Details
      </h3>
      <CardElement className="p-3 border rounded-md" />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        {loading
          ? "Processing..."
          : `Pay $${appointmentData?.selectedDoctorPrice}`}
      </button>

      {success && (
        <p className="text-green-600 font-medium text-center mt-4">
          Payment Successful! 🎉 Redirecting to the homepage...
        </p>
      )}
    </form>
  );
}

export default function Checkout() {
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("appointmentData"));
    setAppointmentData(storedData);
  }, []);

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
          <CheckoutForm appointmentData={appointmentData} />
        </div>
      </div>
    </Elements>
  );
}
