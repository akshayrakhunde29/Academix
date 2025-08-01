import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: String,
    qualification: String,
    experience: Number,
    salary: Number,
    joiningDate: { type: Date, default: Date.now },
    attendance: { type: Number, default: 0 },
    attendanceRecords: [
      {
        date: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["present", "absent", "late"],
          default: "present",
        },
      },
    ],
  },
  { timestamps: true }
);
export const Teacher = mongoose.model("Teacher", teacherSchema);
