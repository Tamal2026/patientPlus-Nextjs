import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";

// API FOR DELETING THE USER
export const DELETE = async (req) => {
  try {
    // Extract the `id` from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract the last segment of the path

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid user ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Delete the user with the given ID
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response(
        JSON.stringify({ message: "User deleted successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
