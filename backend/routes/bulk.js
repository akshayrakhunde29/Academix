import express from "express";
import { Student } from "../models/Student.model.js";
import { Teacher } from "../models/Teacher.model.js";
const router = express.Router();

// 📌 Bulk Student Attendance
router.post("/students/attendance", async (req, res) => {
  try {
    const { date, attendanceData } = req.body; // [{ studentId, status }]
    const results = [];

    for (const record of attendanceData) {
      const student = await Student.findById(record.studentId);
      if (student) {
        student.attendanceRecords.push({
          date: new Date(date),
          status: record.status,
        });

        const totalRecords = student.attendanceRecords.length;
        const presentRecords = student.attendanceRecords.filter(
          (r) => r.status === "present"
        ).length;
        student.attendance = Math.round((presentRecords / totalRecords) * 100);

        await student.save();
        results.push(student);
      }
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Bulk Teacher Attendance
router.post("/teachers/attendance", async (req, res) => {
  try {
    const { date, attendanceData } = req.body; // [{ teacherId, status }]
    const results = [];

    for (const record of attendanceData) {
      const teacher = await Teacher.findById(record.teacherId);
      if (teacher) {
        teacher.attendanceRecords.push({
          date: new Date(date),
          status: record.status,
        });

        const totalRecords = teacher.attendanceRecords.length;
        const presentRecords = teacher.attendanceRecords.filter(
          (r) => r.status === "present"
        ).length;
        teacher.attendance = Math.round((presentRecords / totalRecords) * 100);

        await teacher.save();
        results.push(teacher);
      }
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
