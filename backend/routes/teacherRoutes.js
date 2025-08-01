// routes/teacherRoutes.js
import express from "express";
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  markTeacherAttendance,
} from "../services/teacherService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teachers = await getAllTeachers();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const teacher = await createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const teacher = await updateTeacher(req.params.id, req.body);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const teacher = await deleteTeacher(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id/attendance", async (req, res) => {
  try {
    const updatedTeacher = await markTeacherAttendance(
      req.params.id,
      req.body.status
    );
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
