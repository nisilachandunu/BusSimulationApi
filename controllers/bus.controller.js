import Bus from "../models/Bus.model.js";
import { busValidationSchema, busUpdateValidationSchema } from "../validations/bus.validation.js";

// GET /buses?route=01
export const getBuses = async (req, res) => {
  try {
    const { route } = req.query;
    const filter = {};
    if (route) filter.routeCode = route; // optional route filter

    const buses = await Bus.find(filter);
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses", error });
  }
};

// GET /buses/:id
export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus", error });
  }
};

// POST /buses
export const createBus = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = busValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation failed", details: error.details });
    }

    // Create bus
    const bus = new Bus(value);
    await bus.save();

    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ message: "Error creating bus", error: err.message });
  }
};

// PUT /buses/:id
export const updateBus = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = busUpdateValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const bus = await Bus.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true,
    });
    
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Error updating bus", error });
  }
};

// DELETE /buses/:id
export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bus", error });
  }
};
