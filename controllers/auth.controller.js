import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const register = async (req, res) => {
  try {
    const { email, password, role = "commuter", operatorId = null } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, role, operatorId });
    return res.status(201).json({ id: user._id, email: user.email, role: user.role, operatorId: user.operatorId });
  } catch (err) {
    return res.status(500).json({ message: "registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "invalid credentials" });
    const token = jwt.sign({ sub: String(user._id), role: user.role, operatorId: user.operatorId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token, user: { id: user._id, email: user.email, role: user.role, operatorId: user.operatorId } });
  } catch (err) {
    return res.status(500).json({ message: "login failed", error: err.message });
  }
};

export const me = async (req, res) => {
  return res.json({ user: req.user });
};



