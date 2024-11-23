import { connectDB } from "@/app/lib/connectDB";

export const GET = async () => {
  try {
    // Connect to the database
    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Fetch all users
    const allUsers = await usersCollection.find({}).toArray();

    // Handle empty state
    if (allUsers.length === 0) {
      return new Response(
        JSON.stringify({ users: [], message: "No users found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Format user data (optional, if formatting is needed)
    const formattedUsers = allUsers.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    }));

    // Respond with all users
    return new Response(
      JSON.stringify({
        users: formattedUsers,
        count: formattedUsers.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching users:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
