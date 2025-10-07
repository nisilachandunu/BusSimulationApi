import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "missing token" });
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ message: "invalid token" });
    req.user = { id: String(user._id), role: user.role, operatorId: user.operatorId };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized", error: err.message });
  }
};

export const requireRole = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "unauthorized" });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "forbidden" });
  return next();
};



