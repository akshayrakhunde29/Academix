// routes/feeRoutes.js
import express from "express";
import {
  getAllFees,
  getFeesByStudent,
  createFee,
  updateFee,
  payFee,
} from "../services/feeService.js";

const router = express.Router();

// GET all fees
router.get("/", async (req, res) => {
  try {
    const fees = await getAllFees();
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET fees for a specific student
router.get("/student/:studentId", async (req, res) => {
  try {
    const fees = await getFeesByStudent(req.params.studentId);
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new fee
router.post("/", async (req, res) => {
  try {
    const fee = await createFee(req.body);
    res.status(201).json(fee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update fee
router.put("/:id", async (req, res) => {
  try {
    const fee = await updateFee(req.params.id, req.body);
    if (!fee) {
      return res.status(404).json({ message: "Fee record not found" });
    }
    res.json(fee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT pay fee
router.put("/:id/pay", async (req, res) => {
  try {
    const fee = await payFee(req.params.id, req.body);
    if (!fee) {
      return res.status(404).json({ message: "Fee record not found" });
    }
    res.json(fee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
