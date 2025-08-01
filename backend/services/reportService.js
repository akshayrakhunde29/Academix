import { Fee } from "../models/Fees.model.js";
import { Student } from "../models/Student.model.js";
import { Teacher } from "../models/Teacher.model.js";

// Attendance Report
export const getAttendanceReport = async ({ startDate, endDate, type }) => {
  let query = {};
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  let data = {};

  if (type === "students" || !type) {
    const students = await Student.find(
      query,
      "name class rollNo attendance attendanceRecords"
    );
    data.students = students;
  }

  if (type === "teachers" || !type) {
    const teachers = await Teacher.find(
      query,
      "name subject attendance attendanceRecords"
    );
    data.teachers = teachers;
  }

  return data;
};

// Fee Report
export const getFeeReport = async (status) => {
  let query = {};
  if (status) {
    query.status = status;
  }

  const fees = await Fee.find(query)
    .populate("studentId", "name class rollNo")
    .sort({ dueDate: -1 });

  const summary = {
    total: fees.length,
    totalAmount: fees.reduce((acc, fee) => acc + fee.amount, 0),
    paid: fees.filter((f) => f.status === "Paid").length,
    pending: fees.filter((f) => f.status === "Pending").length,
    overdue: fees.filter((f) => f.status === "Overdue").length,
  };

  return { fees, summary };
};
