// app/api/Blog/api.js
import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const blogsCollection = db.collection("blogs");
  try {
    const blogs = await blogsCollection.find().toArray();

    if (blogs.length === 0) {
      return new NextResponse(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify(blogs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch blog posts" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
