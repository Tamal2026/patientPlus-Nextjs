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
    return <progress className="progress w-56"></progress>;
  }

  if (error) {
    return <div className="mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-20">
      <div className="flex items-center gap-x-10 mb-5">
        <h1 className="text-2xl font-bold mb-4">Payment History</h1>
        <Link href={"/Dashboard/user"}>
          <button className="flex items-center btn bg-sky-600 text-white">
            <FaHome></FaHome> Dashboard
          </button>
        </Link>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
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
                  {/* Ensure amount is valid before using toFixed */}
                  {payment.amount !== undefined && payment.amount !== null
                    ? `$${payment.amount.toFixed(2)}`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </tbody>
      </table>
    </div>
  );
}
