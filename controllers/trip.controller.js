import fs from "fs";
import { generateTrips } from "../utils/seeders/generateTrips.js";
import Trip from "../models/Trip.model.js";
import timeToMinutes from "../utils/helpers/timeToMinutes.js";
import {
  tripValidationSchema,
  tripUpdateValidationSchema,
} from "../validations/trip.validation.js";

export const generateTripsJson = async (req, res) => {
  const { startDate, days } = req.body;
  const trips = generateTrips(startDate, days || 7);
  fs.writeFileSync("./constants/trips.json", JSON.stringify(trips, null, 2));
  res.json({ message: "Trips generated", count: trips.length });
};

export const seedTrips = async (req, res) => {
  // implementation for seeding trips into the database
  await Trip.deleteMany({});
  const trips = JSON.parse(fs.readFileSync("./constants/trips.json"));
  await Trip.insertMany(trips);
  res.json({ message: "Trips seeded", count: trips.length });
};

/**
 * GET /trips?route=01&date=2025-09-30
 * Returns trips for a specific route and date.
 * Both query params are required.
 */
export const getTrips = async (req, res) => {
  try {
    const { route, date } = req.query;

    if (!route || !date) {
      return res.status(400).json({
        message: "Please provide both route and date query parameters",
      });
    }

    // Construct filter for both directions (A and B)
    const routeIds = [`${route}A`, `${route}B`];
    const filter = {
      routeId: { $in: routeIds },
      date, // string "YYYY-MM-DD"
    };

    // Sort by routeId (A first, B second) and then by departureTime
    const trips = await Trip.find(filter).sort({
      routeId: 1, // "01A" < "01B"
      departureTime: 1, // earliest departure first
    });

    res.json(trips); // virtuals departureHHMM/arrivalHHMM included
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error });
  }
};

// POST /trips
export const createTrip = async (req, res) => {
  try {
    const payload = { ...req.body };

    // convert if times are given as HH:mm
    if (payload.departureTime && typeof payload.departureTime === "string") {
      payload.departureTime = timeToMinutes(payload.departureTime);
    }
    if (payload.arrivalTime && typeof payload.arrivalTime === "string") {
      payload.arrivalTime = timeToMinutes(payload.arrivalTime);
    }

    // validate
    const { error, value } = tripValidationSchema.validate(payload);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const trip = await Trip.create(value);
    res.status(201).json(trip);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating trip", error: err.message });
  }
};

// PUT /trips/:id
export const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.departureTime)
      updates.departureTime = timeToMinutes(updates.departureTime);
    if (updates.arrivalTime)
      updates.arrivalTime = timeToMinutes(updates.arrivalTime);

    // Validate with Joi (partial updates allowed)
    const { error, value } = tripUpdateValidationSchema.validate(updates);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Update DB
    const trip = await Trip.findByIdAndUpdate(id, value, { new: true });
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error updating trip", error });
  }
};

// DELETE /trips/:id
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findByIdAndDelete(id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip", error });
  }
};
