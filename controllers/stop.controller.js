import Stop from "../models/Stop.model.js";
import {
  stopValidationSchema,
  stopUpdateValidationSchema,
} from "../validations/stop.validation.js";

// GET /stops?name=
export const getStops = async (req, res) => {
  try {
    const filter = {};
    if (req.query.name) filter.name = req.query.name;

    const stops = await Stop.find(filter);
    res.json(stops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stops", error });
  }
};

// GET /stops/:id
export const getStopById = async (req, res) => {
  try {
    const stop = await Stop.findById(req.params.id);
    if (!stop) return res.status(404).json({ message: "Stop not found" });
    res.json(stop);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stop", error });
  }
};

// POST /stops
export const addStop = async (req, res) => {
  try {
    const { error, value } = stopValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const stop = new Stop(value);
    await stop.save();
    res.status(201).json(stop);
  } catch (error) {
    res.status(500).json({ message: "Error adding stop", error });
  }
};

// PUT /stops/:id
export const updateStop = async (req, res) => {
  try {
    const { error, value } = stopUpdateValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const stop = await Stop.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!stop) return res.status(404).json({ message: "Stop not found" });
    res.json(stop);
  } catch (error) {
    res.status(500).json({ message: "Error updating stop", error });
  }
};

// DELETE /stops/:id
export const deleteStop = async (req, res) => {
  try {
    const stop = await Stop.findByIdAndDelete(req.params.id);
    if (!stop) return res.status(404).json({ message: "Stop not found" });
    res.json({ message: "Stop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting stop", error });
  }
};
