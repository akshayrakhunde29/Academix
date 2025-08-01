import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    capacity: { type: Number, required: true },
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    subjects: [String],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);
export const Class = mongoose.model("Class", classSchema);
