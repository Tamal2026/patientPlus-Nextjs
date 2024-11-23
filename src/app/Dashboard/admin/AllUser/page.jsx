"use client";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

export default function Alluser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/AllUser/api"
        );
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (response.ok) {
          setUsers(data.users || []); // Update based on API response
        } else {
          console.error(data.error || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="mt-20">Loading...</div>;
  }

  if (!users || users.length === 0) {
    return <div className="mt-20">No users available.</div>;
  }

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <p className="mb-4">Total Users: {users.length}</p>
      <table className="table-auto w-full border border-gray-300 mt-5">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-5"><button className="flex mx-auto text-xl text-red-500"><FaTrash></FaTrash></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
