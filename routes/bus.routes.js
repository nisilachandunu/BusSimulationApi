import express from "express";
import {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
} from "../controllers/bus.controller.js";

const router = express.Router();

router.get("/", getBuses); // get all buses
router.get("/:id", getBusById); // get bus by ID
router.post("/", createBus); // create new bus
router.put("/:id", updateBus); // update bus by ID
router.delete("/:id", deleteBus); // delete bus by ID

export default router;
