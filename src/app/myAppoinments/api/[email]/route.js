import { connectDB } from "@/app/lib/connectDB";

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const appointmentsCollection = db.collection("appointments");

    const { email } = params; 

    if (!email) {
      return new Response(
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
      return new Response(
        JSON.stringify({ message: "No appointments found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ bookings: myAppointments }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch appointments" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
};
