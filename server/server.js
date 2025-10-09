// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import Order from "./models/Order.js";
import Cracker from "./models/Cracker.js"; // ✅ Product model

dotenv.config();
const app = express();

// ✅ CORS Setup (Netlify + Localhost allowed)
app.use(
  cors({
    origin: [
      "http://localhost:3000",          // local dev
      "https://crackzie.netlify.app",   // your live site (correct spelling)
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Stripe Init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Products (Crackers) Route
app.get("/v1/products", async (req, res) => {
  try {
    const crackers = await Cracker.find();
    res.status(200).json(crackers);
  } catch (error) {
    console.error("❌ Error fetching crackers:", error);
    res
      .status(500)
      .json({ message: "Error fetching crackers", error: error.message });
  }
});

// ✅ Stripe Checkout Session
app.post("/v1/checkout/sessions", async (req, res) => {
  try {
    const { cartItems } = req.body;
    console.log("📦 Cart Items:", cartItems);

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects in paisa
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: ["IN"] },
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("❌ Error creating checkout session:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Retrieve Stripe Session & Save Order
app.get("/v1/checkout/session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ["customer_details", "line_items"],
    });

    const existing = await Order.findOne({ stripeSessionId: session.id });
    if (!existing) {
      const addr = session.customer_details?.address || {};

      const order = new Order({
        userId: session.client_reference_id || "guest",
        customerName: session.customer_details?.name,
        customerEmail: session.customer_details?.email,
        customerPhone: session.customer_details?.phone,
        customerAddress: {
          line1: addr.line1 || "",
          city: addr.city || "",
          state: addr.state || "",
          postal_code: addr.postal_code || "",
          country: addr.country || "",
        },
        items: session.line_items?.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: session.id,
      });

      await order.save();
    }

    res.json(session);
  } catch (err) {
    console.error("❌ Error retrieving session:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Render Port Binding Fix
const PORT = process.env.PORT || 4000; // ⚠️ must use process.env.PORT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
