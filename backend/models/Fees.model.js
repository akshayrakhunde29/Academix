import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    amount: { type: Number, required: true },
    feeType: { type: String, required: true }, // Tuition, Transport, Library, etc.
    dueDate: { type: Date, required: true },
    paidDate: Date,
    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },
    paymentMethod: String,
    transactionId: String,
  },
  { timestamps: true }
);
export const Fee = mongoose.model("Fee", feeSchema);
