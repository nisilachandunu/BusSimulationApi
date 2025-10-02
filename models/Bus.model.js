import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    regNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[A-Z]{2}-\d{4}$/
    },
    operator: {
      type: String,
      required: true,
    },
    routeCode: {
      // corresponds to Route.code (like "01")
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["on-duty", "off-duty", "maintenance"],
      default: "off-duty",
    },
    location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
