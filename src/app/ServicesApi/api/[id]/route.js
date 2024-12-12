import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const servicesCollection = db.collection("services");

    const service = await servicesCollection.findOne({
      _id: new ObjectId(params.id),
    });

    // Return the NextResponse in JSON format
    return new NextResponse(JSON.stringify({ service }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching service:", error);

    // Handle error NextResponse
    return new NextResponse(JSON.stringify({ error: "Failed to fetch service" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
