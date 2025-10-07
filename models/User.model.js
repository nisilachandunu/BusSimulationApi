import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "operator", "commuter"], default: "commuter" },
    operatorId: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);



