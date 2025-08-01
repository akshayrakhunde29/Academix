import { Class } from "../models/classes.model.js";

export const getAllClasses = async () => {
  return await Class.find()
    .populate("classTeacher", "name subject")
    .populate("students", "name rollNo")
    .sort({ grade: 1, section: 1 });
};

export const createClass = async (data) => {
  const classData = new Class(data);
  return await classData.save();
};

export const updateClass = async (id, data) => {
  return await Class.findByIdAndUpdate(id, data, { new: true });
};

export const deleteClass = async (id) => {
  return await Class.findByIdAndDelete(id);
};
