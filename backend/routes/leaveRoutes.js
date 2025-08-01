// routes/leaveRoutes.js
import express from "express";
import {
  getAllLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
  updateLeaveStatus,
} from "../services/leaveService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaves = await getAllLeaves();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const leave = await createLeave(req.body);
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedLeave = await updateLeave(req.params.id, req.body);
    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.json(updatedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedLeave = await deleteLeave(req.params.id);
    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/leaves/:id/status
router.put("/:id/status", async (req, res) => {
  try {
    const updatedLeave = await updateLeaveStatus(req.params.id, req.body);
    res.status(200).json({
      message: "Leave status updated successfully",
      data: updatedLeave,
    });
  } catch (error) {
    console.error("Error updating leave status:", error.message);

    if (
      error.message.includes("required") ||
      error.message.includes("Invalid")
    ) {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.message });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid leave ID format" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
