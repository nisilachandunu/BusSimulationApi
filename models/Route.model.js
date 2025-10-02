// models/Route.js
import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    _id: {
      // make _id the route code 1A, 1B, 2A, 2B etc.
      type: String,
      required: true,
      trim: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    distanceKm: {
      type: Number,
      required: true,
    },
    stops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stop" }],
  },
  { timestamps: true }
);

export default mongoose.model("Route", routeSchema);
