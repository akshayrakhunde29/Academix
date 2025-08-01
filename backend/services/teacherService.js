import { Teacher } from "../models/Teacher.model.js";

export const getAllTeachers = async () => {
  return await Teacher.find().sort({ createdAt: -1 });
};

export const createTeacher = async (data) => {
  const teacher = new Teacher(data);
  return await teacher.save();
};

export const updateTeacher = async (id, data) => {
  return await Teacher.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTeacher = async (id) => {
  return await Teacher.findByIdAndDelete(id);
};

export const markTeacherAttendance = async (id, status) => {
  const teacher = await Teacher.findById(id);
  if (!teacher) throw new Error("Teacher not found");

  teacher.attendanceRecords.push({ status });

  const total = teacher.attendanceRecords.length;
  const present = teacher.attendanceRecords.filter(
    (record) => record.status === "present"
  ).length;

  teacher.attendance = Math.round((present / total) * 100);
  return await teacher.save();
};
