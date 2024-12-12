import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      selectedDoctorPrice,
      selectedDoctor,
      phone,
      name,
      reason,
      email,
      time,
      date,
    } = body;

    // Validate the price
    
    const price = parseFloat(selectedDoctorPrice);
    if (isNaN(price) || price <= 0) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid selectedDoctorPrice provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: "usd",
      payment_method_types: ["card"],
    });


    const db = await connectDB();

    async function insertIfNotExists(collectionName, query, data) {
      const existing = await db.collection(collectionName).findOne(query);
      if (!existing) {
        await db.collection(collectionName).insertOne(data);
      } else {
        console.log(`Duplicate entry detected in ${collectionName}. Skipping insertion.`);
      }
    }

    // 3. Save Payment Data
    const paymentData = {
      paymentIntentId: paymentIntent.id,
      amount: price,
      currency: "usd",
      email,
      status: "pending",
      createdAt: new Date(),
    };
    await insertIfNotExists("payments", { paymentIntentId: paymentIntent.id }, paymentData);

    // 4. Save Appointment Data
    const appointmentData = {
      selectedDoctor,
      phone,
      name,
      reason,
      amount: price,
      email,
      paymentIntentId: paymentIntent.id,
      status: "pending",
      time,
      date,
      createdAt: new Date(),
    };
    await insertIfNotExists("appointments", { paymentIntentId: paymentIntent.id }, appointmentData);

    // 5. Return Success NextResponse
    return new NextResponse(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        message: "Payment intent created and data saved to database",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing payment and saving data:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process the request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
