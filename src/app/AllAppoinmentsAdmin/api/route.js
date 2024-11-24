import { connectDB } from "@/app/lib/connectDB";

export const GET = async () => {
  try {
    const db = await connectDB();
    const apponimentCollection = db.collection("appointments");
    const appoinments = await apponimentCollection.find({}).toArray();
    return new Response(JSON.stringify({ appoinments }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error Fetching Appoinments Admin");

    return new Response(
      JSON.stringify({ error: "Failed to fetch Appoinment" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
