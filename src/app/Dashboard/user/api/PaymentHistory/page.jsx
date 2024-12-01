"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get session data
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/Dashboard/user/api/PaymentHistory/${email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data = await response.json();

        // Extract the payments array from the response
        setPaymentHistory(data.payments || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [email]);

  if (!session) {
    return (
      <div className="mt-20">Please log in to view your payment history.</div>
    );
  }

  if (loading) {
    return <div className="mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {new Date(payment.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.status || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
