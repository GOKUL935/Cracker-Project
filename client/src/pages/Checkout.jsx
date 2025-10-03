// client/src/pages/Checkout.jsx
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useState } from "react";

// ✅ Stripe public (publishable) key
const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

function Checkout() {
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/v1/checkout/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, totalAmount }),
      });

      const data = await response.json();
      console.log("Stripe Session Response 👉", data);

      if (!response.ok) {
        throw new Error(data.error || "Server error while creating session");
      }

      const stripe = await stripePromise;
      if (data.id) {
        // ✅ Redirect to Stripe Checkout
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else if (data.url) {
        // fallback (manual redirect)
        window.location.href = data.url;
      } else {
        alert("❌ Checkout failed: No session info received");
      }
    } catch (err) {
      console.error("❌ Stripe error:", err);
      alert("Checkout failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <p key={index}>
              {item.name} ({item.quantity}x) – ₹{item.price * item.quantity}
            </p>
          ))}

          <h3>Total: ₹{totalAmount}</h3>

          <button
            onClick={handleStripePayment}
            disabled={loading}
            style={{
              background: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            {loading ? "Processing..." : "Pay with Stripe"}
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
