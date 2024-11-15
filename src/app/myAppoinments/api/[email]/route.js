import { connectDB } from "@/app/lib/connectDB";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const appointmentsCollection = db.collection("appointments");

  try {
    const myAppointments = await appointmentsCollection
      .find({ email: params.email })
      .toArray();

    return new Response(JSON.stringify({ myAppointments }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch appointments" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
