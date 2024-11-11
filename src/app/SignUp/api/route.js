import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    const dbName = "patientPlus";
    const db = await connectDB(dbName);
    const userCollection = db.collection("users");

    const newUser = await request.json();

    if (!newUser || !newUser.email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const existingUser = await userCollection.findOne({ email: newUser.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 10);

    const result = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
};
