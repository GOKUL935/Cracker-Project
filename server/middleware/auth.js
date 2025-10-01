// server/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const header = req.header("Authorization") || req.header("authorization");
  const token = header?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message || err);
    res.status(401).json({ msg: "Token invalid" });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only" });
  next();
};
