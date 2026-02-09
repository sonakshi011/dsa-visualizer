import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import sessionRoutes from "./routes/sessions.js";

const app = express();

/* =====================
   ✅ SIMPLE & SAFE CORS
===================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://dsa-visualizer-eta.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ✅ Handle preflight explicitly
app.options("*", cors());

/* =====================
   BODY PARSER
===================== */
app.use(express.json());

/* =====================
   ENV CHECK
===================== */
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET missing");
  process.exit(1);
} else {
  console.log("✅ JWT_SECRET loaded");
}

/* =====================
   ROUTES
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* =====================
   DB + SERVER
===================== */
const PORT = process.env.PORT || 10000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });
