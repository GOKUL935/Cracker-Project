// server/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: Object,
  items: Array,
  totalAmount: Number,       // ✅ field used for revenue calc
  stripeSessionId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
