import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";  // ✅ Auth routes
import adminRoutes from "./routes/admin.js";
import Order from "./models/Order.js"; // ✅ Order model import pannunga

dotenv.config();
const app = express();
app.use(cors({
  origin:"https://crackize.netlify.app"
}));
app.use(express.json());
app.use("/api/admin", adminRoutes);

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 4000;

// ✅ Auth routes (Signup + Login)
app.use("/api/auth", authRoutes);

// ✅ Create Checkout Session
app.post("/v1/checkout/sessions", async (req, res) => {
  try {
    const { cartItems } = req.body;

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
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,

      // ✅ collect phone + address
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },

      // ✅ safer URL (don’t depend on headers.origin)
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Error creating checkout session:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Retrieve session with expanded details + SAVE order in DB
app.get("/v1/checkout/session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ["customer_details", "line_items"],
    });

    // ✅ Check if already saved
    const existing = await Order.findOne({ stripeSessionId: session.id });
    if (!existing) {
      const order = new Order({
        userId: session.client_reference_id || "guest",
        customerName: session.customer_details?.name,
        customerEmail: session.customer_details?.email,
        customerPhone: session.customer_details?.phone,
        customerAddress: session.customer_details?.address,
        items: session.line_items?.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: session.id,
      });

      await order.save(); // ✅ save to MongoDB
    }

    res.json(session);
  } catch (err) {
    console.error("❌ Error retrieving session:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
