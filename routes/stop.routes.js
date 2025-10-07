import express from "express";
import {
  getStops,
  getStopById,
  addStop,
  updateStop,
  deleteStop,
} from "../controllers/stop.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getStops); // get all stops or filter by name
router.get("/:id", getStopById); // get stop by ID
router.post("/", requireAuth, requireRole(["admin"]), addStop);
router.put("/:id", requireAuth, requireRole(["admin"]), updateStop);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteStop);

export default router;
