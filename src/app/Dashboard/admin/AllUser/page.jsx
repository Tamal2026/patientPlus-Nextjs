"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Alluser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/AllUser/api");
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUsers(data.users || []);
      } else {
        Swal.fire("Error", data.error || "Failed to fetch users", "error");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("Error", "Unable to fetch users.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the user permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:3000/AllUser/api/${id}`,
            { method: "DELETE" }
          );
          const data = await response.json();

          if (response.ok) {
            Swal.fire("Deleted!", "The user has been deleted.", "success");
            fetchUsers();
          } else {
            Swal.fire("Error", data.error || "Failed to delete user", "error");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleMakeAdmin = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This user will be granted admin privileges!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Sending PATCH request with the necessary body and headers
          const response = await fetch(
            `http://localhost:3000/AllUser/api/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json", // Ensure the server recognizes the payload format
              },
              body: JSON.stringify({ role: "admin" }), // Include the necessary payload
            }
          );

          const data = await response.json(); // Parse the response

          if (response.ok) {
            // Notify success
            Swal.fire(
              "Success!",
              `The user has been granted admin privileges.`,
              "success"
            );
            fetchUsers(); // Refresh the user list
          } else {
            // Handle server errors
            Swal.fire("Error", data.error || "Failed to update role", "error");
          }
        } catch (error) {
          // Handle network or other unexpected errors
          console.error("Error updating role:", error);
          Swal.fire(
            "Error!",
            "Something went wrong while processing your request.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.role === "admin" ? (
                  <button>{user.role}</button>
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user.id)}
                    className="text-blue-500 text-2xl"
                  >
                    <FaUser />
                  </button>
                )}
              </td>
              <td className="border px-4 py-5">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="flex mx-auto text-xl text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
