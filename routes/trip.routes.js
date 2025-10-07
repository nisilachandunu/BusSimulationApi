import express from "express";
import {
  generateTripsJson,
  seedTrips,
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/trip.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/generate-trips-json", requireAuth, requireRole(["admin"]), generateTripsJson);
router.post("/seed-trips", requireAuth, requireRole(["admin"]), seedTrips);
router.get("/", getTrips); // query: route & date required
router.post("/", requireAuth, requireRole(["admin", "operator"]), createTrip);
router.put("/:id", requireAuth, requireRole(["admin", "operator"]), updateTrip);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteTrip);

export default router;
