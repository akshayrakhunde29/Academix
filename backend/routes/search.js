import express from "express";
import { Teacher } from "../models/Teacher.model.js";
import { Student } from "../models/Student.model.js";
import { Event } from "../models/event.model.js";

const router = express.Router();

// 🔍 Search Functionality
router.get("/", async (req, res) => {
  try {
    const { query, type } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchRegex = new RegExp(query, "i");
    let results = {};

    if (type === "students" || !type) {
      results.students = await Student.find({
        $or: [
          { name: searchRegex },
          { rollNo: searchRegex },
          { class: searchRegex },
        ],
      }).limit(10);
    }

    if (type === "teachers" || !type) {
      results.teachers = await Teacher.find({
        $or: [{ name: searchRegex }, { subject: searchRegex }],
      }).limit(10);
    }

    if (type === "events" || !type) {
      results.events = await Event.find({
        $or: [{ title: searchRegex }, { type: searchRegex }],
      }).limit(10);
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
