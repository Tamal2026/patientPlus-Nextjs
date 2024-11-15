import { connectDB } from "@/app/lib/connectDB";

export const POST = async (request) => {
  try {
    const appointment = await request.json();

    const db = await connectDB();
    const appointmentsCollection = db.collection("appointments");

    const newAppointment = await appointmentsCollection.insertOne(appointment);

    return new Response(
      JSON.stringify({ message: "Appointment successfully booked!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error booking appointment:", error);

    return new Response(
      JSON.stringify({ message: "Failed to book appointment" }),
      { status: 500 }
    );
  }
};
