import express from "express";
import {
  getStops,
  getStopById,
  addStop,
  updateStop,
  deleteStop,
} from "../controllers/stop.controller.js";

const router = express.Router();

router.get("/", getStops); // get all stops or filter by name
router.get("/:id", getStopById); // get stop by ID
router.post("/", addStop); // add new stop
router.put("/:id", updateStop); // update stop by ID
router.delete("/:id", deleteStop); // delete stop by ID

export default router;
