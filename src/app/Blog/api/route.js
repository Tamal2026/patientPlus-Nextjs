// app/api/Blog/api.js
import { connectDB } from "@/app/lib/connectDB";

export const GET = async (request) => {
  const db = await connectDB();
  const blogsCollection = db.collection("blogs");
  try {
    // Fetching all blog posts from the database
    const blogs = await blogsCollection.find().toArray();

    // Check if blogs are found, if not, return an empty array
    if (blogs.length === 0) {
      return new Response(
        JSON.stringify([]),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the response with a valid JSON structure
    return new Response(
      JSON.stringify(blogs),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch blog posts" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
