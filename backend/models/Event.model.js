import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    type: {
      type: String,
      enum: ["Academic", "Sports", "Cultural", "Other"],
      required: true,
    },
    venue: String,
    organizer: String,
    media: [
      {
        filename: String,
        originalName: String,
        mimetype: String,
        path: String,
        uploadDate: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
export const Event = mongoose.model("Event", eventSchema);