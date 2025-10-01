const mongoose = require('mongoose');

const CrackerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Cracker', CrackerSchema);
