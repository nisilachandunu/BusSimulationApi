import express from "express";
import {
  addRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from "../controllers/route.controller.js";

const router = express.Router();

router.post("/", addRoute); // add new route
router.get("/", getRoutes); // get all routes
router.get("/:id", getRouteById); // get route by ID
router.put("/:id", updateRoute); // update route by ID
router.delete("/:id", deleteRoute); // delete route by ID

export default router;
