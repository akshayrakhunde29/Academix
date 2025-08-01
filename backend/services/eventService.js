import { Event } from "../models/event.model.js";

export const getAllEvents = async () => {
  return await Event.find().sort({ date: -1 });
};

export const createEvent = async (data, files) => {
  if (files && files.length > 0) {
    data.media = files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
    }));
  }

  const event = new Event(data);
  return await event.save();
};

export const updateEvent = async (id, data, files) => {
  if (files && files.length > 0) {
    const newMedia = files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
    }));

    const existingEvent = await Event.findById(id);
    data.media = [...(existingEvent.media || []), ...newMedia];
  }

  return await Event.findByIdAndUpdate(id, data, { new: true });
};

export const deleteEvent = async (id) => {
  return await Event.findByIdAndDelete(id);
};
