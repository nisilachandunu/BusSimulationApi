import fs from "fs";
import path from "path";
import Route from "../../models/Route.model.js";
import Stop from "../../models/Stop.model.js";

export const loadRoutes = async () => {
  try {
    const routesCount = await Route.countDocuments();
    if (routesCount > 0) {
      console.log("Routes already exist in DB.");
      return;
    }

    const routesFile = path.join(process.cwd(), "./constants/routes.json");
    const routesData = JSON.parse(fs.readFileSync(routesFile, "utf-8"));

    const routesToInsert = [];

    for (const route of routesData) {
      // Query Stop IDs for the route's stops
      const stopDocs = await Stop.find({ name: { $in: route.stops } });

      // Map stop names to IDs preserving order
      const orderedStops = route.stops.map(
        name => stopDocs.find(s => s.name === name)._id
      );

      // Forward route
      routesToInsert.push({
        _id: `${route.code}A`, // e.g., "01A"
        origin: route.origin,
        destination: route.destination,
        distanceKm: route.distanceKm,
        stops: orderedStops
      });

      // Reverse route
      routesToInsert.push({
        _id: `${route.code}B`, // e.g., "01B"
        origin: route.destination,
        destination: route.origin,
        distanceKm: route.distanceKm,
        stops: [...orderedStops].reverse()
      });
    }

    await Route.insertMany(routesToInsert);
    console.log("Routes loaded successfully into DB.");
  } catch (err) {
    console.error("Error loading routes:", err.message);
  }
};
