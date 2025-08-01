import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    class: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email: String,
    address: String,
    parentName: String,
    parentPhone: String,
    dateOfBirth: Date,
    admissionDate: { type: Date, default: Date.now },
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
export const Student = mongoose.model("Student", studentSchema);
