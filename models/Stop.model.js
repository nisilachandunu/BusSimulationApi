import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true }
});

export default mongoose.model("Stop", stopSchema);