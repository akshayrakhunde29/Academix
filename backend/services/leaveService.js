import { Leave } from "../models/Leave.model.js";

export const getAllLeaves = async () => {
  return await Leave.find().sort({ createdAt: -1 });
};

export const createLeave = async (data) => {
  const leave = new Leave(data);
  return await leave.save();
};

export const updateLeave = async (id, data) => {
  return await Leave.findByIdAndUpdate(id, data, { new: true });
};

export const deleteLeave = async (id) => {
  return await Leave.findByIdAndDelete(id);
};

export const updateLeaveStatus = async (id, body) => {
  const { status, approvedBy, remarks } = body;

  if (!status) {
    throw new Error("Status is required");
  }

  const validStatuses = ["Pending", "Approved", "Rejected"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status. Must be Pending, Approved, or Rejected");
  }

  const updateData = { status };

  if (status === "Approved" || status === "Rejected") {
    if (!approvedBy) {
      throw new Error("approvedBy is required for Approved/Rejected status");
    }
    updateData.approvedBy = approvedBy;
    updateData.approvedDate = new Date();
    updateData.remarks = remarks || "";
  }

  const leave = await Leave.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!leave) {
    throw new Error("Leave request not found");
  }

  return leave;
};
