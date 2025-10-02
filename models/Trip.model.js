import mongoose from "mongoose";
import minutesToTime from "../utils/helpers/minutesToTime.js";

const tripSchema = new mongoose.Schema(
  {
    routeId: { type: String, ref: "Route", required: true },
    busRegNo: { type: String, required: true },
    departureTime: { type: Number, required: true }, // minutes since midnight
    arrivalTime: { type: Number, required: true },   // minutes since midnight
    date: { type: String, required: true },         // "YYYY-MM-DD"
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

// Virtuals to get HH:mm strings for API
tripSchema.virtual("departureHHMM").get(function () {
  return minutesToTime(this.departureTime);
});
tripSchema.virtual("arrivalHHMM").get(function () {
  return minutesToTime(this.arrivalTime);
});

// Clean JSON output
tripSchema.set("toJSON", {
  virtuals: true,         // include virtuals like departureHHMM
  versionKey: false,      // remove __v
  transform: (doc, ret) => {
    delete ret.id;       // remove _id
    delete ret.createdAt; // optional: remove timestamps
    delete ret.updatedAt;
    return ret;
  },
});

export default mongoose.model("Trip", tripSchema);
