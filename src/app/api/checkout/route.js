import Stripe from "stripe";
import { connectDB } from "@/app/lib/connectDB";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body from the request
    const { items, userId } = body;

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Save payment details in your database
    const db = await connectDB();
    await db.collection("payments").insertOne({
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: "pending",
      userId,
      items,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Replace with your order amount calculation logic
function calculateOrderAmount(items) {
  return (
    items.reduce((total, item) => total + item.price * item.quantity, 0) * 100
  );
}
