import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  try {
    const db = await connectDB();
    const appointmentCollection = db.collection("appointments");

    const result = await appointmentCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No booking found with the given ID" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Booking deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(JSON.stringify({ error: "Failed to delete booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// PATCH API FOR THE UPDATE THE APPOINMENT INFO

export const PATCH = async (request, { params }) => {
const body = await request.json()
const{ date,time} = body
  try {
    const db = await connectDB();
    const appointmentCollection = db.collection("appointments");

    const result = await appointmentCollection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          date,
          time,
        },
      },
      {
        upsert: true,
      }
    );

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No booking found with the given ID" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Booking updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(JSON.stringify({ error: "Failed to update booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// GET API FOR THE APPOINMENT
export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const appointmentCollection = db.collection("appointments");

    const result = await appointmentCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No booking found with the given ID" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Booking GET successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(JSON.stringify({ error: "Failed to delete booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
