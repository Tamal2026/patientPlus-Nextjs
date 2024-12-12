import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const apponimentCollection = db.collection("appointments");
    const appoinments = await apponimentCollection.find({}).toArray();
    return new NextResponse(JSON.stringify({ appoinments }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error Fetching Appoinments Admin");

    return new NextResponse(
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
