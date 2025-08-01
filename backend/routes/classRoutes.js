// routes/classRoutes.js
import express from "express";
import {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../services/classService.js";

const router = express.Router();

// GET all classes
router.get("/", async (req, res) => {
  try {
    const classes = await getAllClasses();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create class
router.post("/", async (req, res) => {
  try {
    const newClass = await createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update class
router.put("/:id", async (req, res) => {
  try {
    const updatedClass = await updateClass(req.params.id, req.body);
    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE class
router.delete("/:id", async (req, res) => {
  try {
    const deletedClass = await deleteClass(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
