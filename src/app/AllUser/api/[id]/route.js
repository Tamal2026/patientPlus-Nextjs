import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";

// API for deleting the user
export const DELETE = async (req) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

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

// API for updating user to admin
export const PATCH = async (req, { params }) => {
  try {
    // Log the incoming request URL and method
    console.log("Request URL:", req.url);
    console.log("Request Method:", req.method);

    // Parse the JSON body
    let updateDoc;
    try {
      updateDoc = await req.json();
      console.log("Parsed Body:", updateDoc);
    } catch (error) {
      console.error("Error parsing body:", error);
      return new Response(
        JSON.stringify({ error: "Invalid or empty request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate params.id
    const userId = params.id || req.url.split("/").pop(); // Ensure valid ID extraction
    if (!ObjectId.isValid(userId)) {
      return new Response(JSON.stringify({ error: "Invalid user ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Update user role
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...updateDoc,
        },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "User updated to admin successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

