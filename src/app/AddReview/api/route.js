import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const review = await request.json();
    const db = await connectDB()
    const reviewCollection = db.collection("reviews");
    const newReview = await reviewCollection.insertOne(review);
    return new NextResponse(
      JSON.stringify({ message: "Review Successfully saved" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error for the saving review", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to saved Reviews" }),
      { status: 500 }
    );
  }
};
