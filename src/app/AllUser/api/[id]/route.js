import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// API for deleting the user
export const DELETE = async (req) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ error: "Invalid user ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Delete the user with the given ID
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new NextResponse(
        JSON.stringify({ message: "User deleted successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// API for updating user to admin
export const PATCH = async (req, { params }) => {
  try {

    const resolvedParams = await params;

    // Validate the ID
    if (
      !resolvedParams ||
      !resolvedParams.id ||
      !ObjectId.isValid(resolvedParams.id)
    ) {
      return new NextResponse(JSON.stringify({ error: "Invalid user ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Proceed with your update logic
    const id = resolvedParams.id;
    const updateDoc = await req.json();

    const db = await connectDB();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateDoc }
    );

    if (result.matchedCount === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "User updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
