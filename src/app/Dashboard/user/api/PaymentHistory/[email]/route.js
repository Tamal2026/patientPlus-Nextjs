import { connectDB } from "@/app/lib/connectDB";

export const GET = async () => {
  try {
    const db = await connectDB();
    const paymentCollection = db.collection("payments");
    const payments = await paymentCollection.find({}).toArray();
    return new Response(JSON.stringify({ payments }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error Fetching Payment history Users");
    return new Response(
      JSON.stringify({ error: "Failed to fetch payments history of users" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
