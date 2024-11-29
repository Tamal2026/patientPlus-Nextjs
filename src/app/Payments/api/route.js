import Stripe from "stripe";
import { connectDB } from "@/app/lib/connectDB";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { userEmail, price } = body;

    // Validate price
    if (!price || price <= 0) {
      throw new Error("Invalid price provided");
    }

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100), // Convert dollars to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Save payment details in the database
    const db = await connectDB();
    await db.collection("payments").insertOne({
      paymentIntentId: paymentIntent.id,
      amount: price, // Store price in dollars, as requested
      currency: paymentIntent.currency,
      userEmail, 
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
