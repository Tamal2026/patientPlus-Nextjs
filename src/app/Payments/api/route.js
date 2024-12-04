import Stripe from "stripe";
import { connectDB } from "@/app/lib/connectDB";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const POST = async (req) => {
  try {
    const body = await req.json();
    const {
      userEmail,
      price,
      doctorName,
      phoneNumber,
      patientName,
      reason,
      time,
      date,
    } = body;

    if (!price || price <= 0) {
      return new Response(JSON.stringify({ error: "Invalid price provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Connect to database
    const db = await connectDB();

    // Save payment details in the "payments" collection
    await db.collection("payments").insertOne({
      paymentIntentId: paymentIntent.id,
      amount: price,
      currency: paymentIntent.currency,
      userEmail,
      doctorName,
      time,
      date,
    });

    // Save appointment details in the "appointments" collection
    await db.collection("appointments").insertOne({
      doctorName,
      phoneNumber,
      patientName,
      reason,
      amount: price,
      userEmail,
      paymentIntentId: paymentIntent.id,
      status: "pending",
      createdAt: new Date(),
    });

    // Return client secret for Stripe confirmation
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the payment request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
