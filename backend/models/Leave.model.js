import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["Student", "Teacher"], required: true },
    reason: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    appliedDate: { type: Date, default: Date.now },
    approvedBy: String,
    approvedDate: Date,
    remarks: String,
  },
  { timestamps: true }
);
export const Leave = mongoose.model("Leave", leaveSchema);
