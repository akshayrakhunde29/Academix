import { Student } from "../models/Student.model.js";

export const getAllStudents = async () => {
  return await Student.find().sort({ createdAt: -1 });
};

export const createStudent = async (data) => {
  const student = new Student(data);
  return await student.save();
};

export const updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};

export const markAttendance = async (id, status) => {
  const student = await Student.findById(id);
  if (!student) throw new Error("Student not found");

  student.attendanceRecords.push({ status });

  const total = student.attendanceRecords.length;
  const present = student.attendanceRecords.filter(
    (r) => r.status === "present"
  ).length;

  student.attendance = Math.round((present / total) * 100);
  return await student.save();
};
