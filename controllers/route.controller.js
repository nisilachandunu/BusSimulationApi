import Route from "../models/Route.model.js";
import {
  routeValidationSchema,
  routeUpdateValidationSchema,
} from "../validations/route.validation.js";

// GET /routes?origin=&destination=
export const getRoutes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.origin) filter.origin = req.query.origin;
    if (req.query.destination) filter.destination = req.query.destination;

    const routes = await Route.find(filter).populate("stops");
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routes", error });
  }
};

// GET /routes/:id
export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate("stops");
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: "Error fetching route", error });
  }
};

// POST /routes
export const addRoute = async (req, res) => {
  try {
    const { error, value } = routeValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const rawId = String(value._id).trim();

    const idA = `${rawId}A`;
    const idB = `${rawId}B`;

    const existing = await Route.find({ _id: { $in: [idA, idB] } })
      .select("_id")
      .lean();
    if (existing.length) {
      const existIds = existing.map((r) => r._id);
      return res.status(409).json({
        message: "Route(s) already exist",
        existing: existIds,
      });
    }

    // Build route docs
    const routeA = {
      _id: idA,
      origin: value.origin,
      destination: value.destination,
      distanceKm: value.distanceKm,
      stops: Array.isArray(value.stops) ? value.stops : [],
    };

    const routeB = {
      _id: idB,
      origin: value.destination,
      destination: value.origin,
      distanceKm: value.distanceKm,
      stops: Array.isArray(value.stops)
        ? [...value.stops].slice().reverse()
        : [],
    };

    const routes = await Route.insertMany([routeA, routeB]);

    res.status(201).json(routes);
  } catch (error) {
    res.status(500).json({ message: "Error adding route", error });
  }
};

// PUT /routes/:id
export const updateRoute = async (req, res) => {
  try {
    const { error, value } = routeUpdateValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const route = await Route.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: "Error updating route", error });
  }
};

// DELETE /routes/:id
export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting route", error });
  }
};
