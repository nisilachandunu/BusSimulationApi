import express from "express";
import {
  addRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from "../controllers/route.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, requireRole(["admin"]), addRoute);
router.get("/", getRoutes); // get all routes
router.get("/:id", getRouteById); // get route by ID
router.put("/:id", requireAuth, requireRole(["admin"]), updateRoute);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteRoute);

export default router;
