// server.js - Main server file
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import eventRoutes from "../routes/eventRoutes.js";
import studentRoutes from "../routes/studentRoutes.js";
import teacherRoutes from "../routes/teacherRoutes.js";
import leaveRoutes from "../routes/leaveRoutes.js";
import classRoutes from "../routes/classRoutes.js";
import feeRoutes from "../routes/feeRoutes.js";
import dashboardRoutes from "../routes/dashboardRoutes.js";
import reportRoutes from "../routes/reportRoutes.js";
import searchRoutes from "../routes/search.js";
import bulkRoutes from "../routes/bulk.js";
import feesRoutes from "../routes/feeRoutes.js";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import errorHandler from "../middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Serve static files from /uploads
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB Connection
connectDB();

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/bulk", bulkRoutes);
app.use("/api/fees", feesRoutes);

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("🔻 Shutting down gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});
