// routes/reportRoutes.js
import express from "express";
import {
  getAttendanceReport,
  getFeeReport,
} from "../services/reportService.js";

const router = express.Router();

// GET /api/reports/attendance
router.get("/attendance", async (req, res) => {
  try {
    const data = await getAttendanceReport(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reports/fees
router.get("/fees", async (req, res) => {
  try {
    const data = await getFeeReport(req.query.status);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
