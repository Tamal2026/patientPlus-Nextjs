"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

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
          `${process.env.NEXT_PUBLIC_BASE_URL}/Dashboard/user/api/PaymentHistory/${email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data = await response.json();
        setPaymentHistory(data.payments || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchPaymentHistory();
  }, [email]);

  if (!session) {
    return (
      <div className="mt-20 text-center">Please log in to view your payment history.</div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 mt-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-600 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <div className="mt-20 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="mt-20 px-4">
      <div className="flex items-center gap-x-5 mb-5 justify-between">
        <h1 className="text-2xl font-bold">Payment History</h1>
        <Link href={"/Dashboard/user"}>
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
            <FaHome /> Dashboard
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-50"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(payment.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.amount !== undefined && payment.amount !== null
                    ? `$${payment.amount.toFixed(2)}`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
