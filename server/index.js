import express from "express";
import products from "./Data/productData.js";

const app = express();
const PORT = 4000;

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
