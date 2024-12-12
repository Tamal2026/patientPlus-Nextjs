import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const appointmentsCollection = db.collection("appointments");

    const { email } = await params; 

    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: "Email parameter is missing" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const myAppointments = await appointmentsCollection
      .find({ email })
      .toArray();

    if (myAppointments.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No appointments found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(JSON.stringify({ bookings: myAppointments }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch appointments" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
};
