import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const blog = await request.json();

    const db = await connectDB();
    const blogCollection = db.collection("blogs");

    const newBlog = await blogCollection.insertOne(blog);

    return NextResponse.json(
      { message: "Blog successfully saved", data: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving blog:", error.message);

    return NextResponse.json(
      { message: "Failed to save the blog", error: error.message },
      { status: 500 }
    );
  }
};
