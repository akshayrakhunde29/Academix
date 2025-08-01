import { Fee } from "../models/Fees.model.js";

export const getAllFees = async () => {
  return await Fee.find()
    .populate("studentId", "name class rollNo")
    .sort({ dueDate: -1 });
};

export const getFeesByStudent = async (studentId) => {
  return await Fee.find({ studentId })
    .populate("studentId", "name class rollNo")
    .sort({ dueDate: -1 });
};

export const createFee = async (data) => {
  const fee = new Fee(data);
  return await fee.save();
};

export const updateFee = async (id, data) => {
  return await Fee.findByIdAndUpdate(id, data, { new: true });
};

export const payFee = async (id, { paymentMethod, transactionId }) => {
  return await Fee.findByIdAndUpdate(
    id,
    {
      status: "Paid",
      paidDate: new Date(),
      paymentMethod,
      transactionId,
    },
    { new: true }
  );
};
