import mongoose from "mongoose";

const CrackerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model("Cracker", CrackerSchema);
