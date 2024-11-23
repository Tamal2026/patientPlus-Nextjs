import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/lib/connectDB";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectDB();
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role, 
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role, 
      };
      return session;
    },

    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");

          // Check if the user exists
          const userExist = await userCollection.findOne({ email });

          if (!userExist) {
           
            const res = await userCollection.insertOne({
              name,
              email,
              provider: "google",
              createdAt: new Date(),
             
            });

            console.log("New user created:", res.insertedId);
          }

          return true;
        } catch (error) {
          console.error("Sign-in error:", error);
          return false;
        }
      } else {
        return true;
      }
    },
  },

  pages: {
    signIn: "/Login",
  },
});

export { handler as GET, handler as POST };
