// routes/studentRoutes.js
import express from "express";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  markAttendance,
} from "../services/studentService.js";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new student
router.post("/", async (req, res) => {
  try {
    const student = await createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update student
router.put("/:id", async (req, res) => {
  try {
    const student = await updateStudent(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const student = await deleteStudent(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST attendance
router.post("/:id/attendance", async (req, res) => {
  try {
    const student = await markAttendance(req.params.id, req.body.status);
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
