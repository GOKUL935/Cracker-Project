import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useState } from "react";

// Stripe public key (publishable key)
const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
console.log("Stripe key 👉", publishableKey);

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

      if (!response.ok) {
        throw new Error("Server error while creating session");
      }

      const data = await response.json();

      if (data.id) {
        // ✅ Use Stripe redirect
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else if (data.url) {
        // fallback
        window.location.href = data.url;
      } else {
        alert("❌ Checkout failed: " + (data.error || "Unknown error"));
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
              {item.name} ({item.quantity}x) - ₹{item.price * item.quantity}
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
