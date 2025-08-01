import { Class } from "../models/classes.model.js";
import { Event } from "../models/event.model.js";
import { Fee } from "../models/Fees.model.js";
import { Leave } from "../models/Leave.model.js";
import { Student } from "../models/Student.model.js";
import { Teacher } from "../models/Teacher.model.js";

export const getDashboardStats = async () => {
  const totalStudents = await Student.countDocuments();
  const totalTeachers = await Teacher.countDocuments();
  const totalEvents = await Event.countDocuments();
  const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
  const totalClasses = await Class.countDocuments();
  const pendingFees = await Fee.countDocuments({ status: "Pending" });

  const students = await Student.find({}, "attendance");
  const teachers = await Teacher.find({}, "attendance");

  const avgStudentAttendance =
    students.length > 0
      ? Math.round(
          students.reduce((acc, s) => acc + (s.attendance || 0), 0) /
            students.length
        )
      : 0;

  const avgTeacherAttendance =
    teachers.length > 0
      ? Math.round(
          teachers.reduce((acc, t) => acc + (t.attendance || 0), 0) /
            teachers.length
        )
      : 0;

  const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(5);
  const recentLeaves = await Leave.find().sort({ createdAt: -1 }).limit(5);

  return {
    totalStudents,
    totalTeachers,
    totalEvents,
    pendingLeaves,
    totalClasses,
    pendingFees,
    avgStudentAttendance,
    avgTeacherAttendance,
    recentEvents,
    recentLeaves,
  };
};
