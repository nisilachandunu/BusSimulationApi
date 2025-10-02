import fs from "fs";
import path from "path";
import Bus from "../../models/Bus.model.js";

export const loadBuses = async () => {
  try {
    const busesCount = await Bus.countDocuments();
    if (busesCount > 0) {
      console.log("Buses already exist in DB.");
      return;
    }

    const busesFile = path.join(process.cwd(), "./constants/buses.json");
    const busesData = JSON.parse(fs.readFileSync(busesFile, "utf-8"));

    await Bus.insertMany(busesData);
    console.log("Buses loaded successfully into DB.");
  } catch (err) {
    console.error("Error loading buses:", err.message);
  }
};