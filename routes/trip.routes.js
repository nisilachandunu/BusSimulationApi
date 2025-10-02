import express from "express";
import {
  generateTripsJson,
  seedTrips,
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/trip.controller.js";

const router = express.Router();

router.post("/generate-trips-json", generateTripsJson); // Generate trips JSON
router.post("/seed-trips", seedTrips); // Seed trips
router.get("/", getTrips); // query: route & date required
router.post("/", createTrip); // create new trip
router.put("/:id", updateTrip); // update trip by ID
router.delete("/:id", deleteTrip); // delete trip by ID

export default router;
