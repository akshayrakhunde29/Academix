import express from "express";
import { Fee } from "../models/Fees.model";
const router = express.Router();

// 📌 Update Overdue Fees
router.post("/update-overdue", async (req, res) => {
  try {
    const today = new Date();
    const result = await Fee.updateMany(
      {
        status: "Pending",
        dueDate: { $lt: today },
      },
      { status: "Overdue" }
    );

    res.json({
      message: `Updated ${result.modifiedCount} fees to overdue status`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
