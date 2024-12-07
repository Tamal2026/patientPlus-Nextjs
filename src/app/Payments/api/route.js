import { connectDB } from "@/app/lib/connectDB";
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
      userEmail,
      time,
      date,
    } = body;

    // Validate the price
    const price = parseFloat(selectedDoctorPrice);
    if (isNaN(price) || price <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid selectedDoctorPrice provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // 2. Connect to the database
    const db = await connectDB();

    // 3. Check for duplicate paymentIntentId in the payments collection
    const existingPayment = await db
      .collection("payments")
      .findOne({ paymentIntentId: paymentIntent.id });

    if (!existingPayment) {
      const paymentData = {
        paymentIntentId: paymentIntent.id,
        amount: price,
        currency: "usd",
        userEmail,
        status: "pending",
        createdAt: new Date(),
      };

      await db.collection("payments").insertOne(paymentData);
    } else {
      console.log("Duplicate payment detected. Skipping insertion.");
    }

    // 4. Check for duplicate appointment in the appointments collection
    const existingAppointment = await db
      .collection("appointments")
      .findOne({ paymentIntentId: paymentIntent.id });

    if (!existingAppointment) {
      const appointment = {
        selectedDoctor,
        phone,
        name,
        reason,
        amount: price,
        userEmail,
        paymentIntentId: paymentIntent.id,
        status: "pending", 
        time,
        date,
        createdAt: new Date(),
      };

      await db.collection("appointments").insertOne(appointment);
    } else {
      console.log("Duplicate appointment detected. Skipping insertion.");
    }

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        message: "Payment intent created and data saved to database",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing payment and saving data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
