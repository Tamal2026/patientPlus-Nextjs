import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout({ items }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await response.json();

    if (data.sessionId) {
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      console.error("Failed to create checkout session:", data.error);
    }
  };

  return <button onClick={handleCheckout}>Proceed to Checkout</button>;
}
