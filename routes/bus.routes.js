import express from "express";
import {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
} from "../controllers/bus.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getBuses); // get all buses
router.get("/:id", getBusById); // get bus by ID
router.post("/", requireAuth, requireRole(["admin", "operator"]), createBus);
router.put("/:id", requireAuth, requireRole(["admin", "operator"]), updateBus);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteBus);

export default router;
