import fs from "fs";
import path from "path";
import Stop from "../../models/Stop.model.js";

export const loadStops = async () => {
  try {
    const stopsCount = await Stop.countDocuments();
    if (stopsCount > 0) {
      console.log("Stops already loaded in DB.");
      return;
    }

    const stopsFile = path.join(process.cwd(), "./constants/stops.json");
    const stopsData = JSON.parse(fs.readFileSync(stopsFile, "utf-8"));

    await Stop.insertMany(stopsData);
    console.log("Stops loaded successfully into DB.");
  } catch (err) {
    console.error("Error loading stops:", err.message);
  }
};
