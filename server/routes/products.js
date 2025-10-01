import express from "express";
import products from "./data/product";


const router = express.Router();

router.get("/", (req, res) => {
  res.json(products);
});

export default router;
