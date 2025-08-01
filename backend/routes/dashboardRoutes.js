// routes/dashboardRoutes.js
import express from "express";
import { getDashboardStats } from "../services/dashboardService.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
