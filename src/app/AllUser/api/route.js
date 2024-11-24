import { connectDB } from "@/app/lib/connectDB";

export const GET = async () => {
    try {
      const db = await connectDB();
      const usersCollection = db.collection("users");
  
      const allUsers = await usersCollection.find({}).toArray();
  
      if (allUsers.length === 0) {
        return new Response(
          JSON.stringify({ users: [], message: "No users found" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
  
      const formattedUsers = allUsers.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }));
  
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
      console.log("Error fetching users:", error);
  
      return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };