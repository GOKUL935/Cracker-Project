// server/routes/admin.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Save order after payment success
router.post("/save-order", async (req, res) => {
  try {
    const {
      stripeSessionId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalAmount,
    } = req.body;

    // avoid duplicates
    const exists = await Order.findOne({ stripeSessionId });
    if (exists) {
      return res.status(200).json({ message: "Order already saved" });
    }

    const newOrder = new Order({
      stripeSessionId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalAmount,
    });

    await newOrder.save();
    res.json({ message: "Order saved successfully" });
  } catch (err) {
    console.error("❌ Save order error:", err);
    res.status(500).json({ error: "Server error saving order" });
  }
});

// ✅ Get all orders (for AdminDashboard)
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching orders" });
  }
});

export default router;
