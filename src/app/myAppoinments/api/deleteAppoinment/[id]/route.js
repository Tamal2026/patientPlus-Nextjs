import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  try {
    const db = await connectDB(); // Ensure the DB connection is awaited
    const appointmentCollection = db.collection("appointments");

    const result = await appointmentCollection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "No booking found with the given ID" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Booking deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(JSON.stringify({ error: "Failed to delete booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
