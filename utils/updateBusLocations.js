// utils/updateBusLocations.js
import Bus from "../models/Bus.model.js";
import Trip from "../models/Trip.model.js";
import Route from "../models/Route.model.js";

// Helper: pick a random stop from a route
function pickRandomStop(route) {
  if (!route.stops || route.stops.length === 0) return null;
  const index = Math.floor(Math.random() * route.stops.length);
  return route.stops[index];
}

export async function updateBusLocations() {
  try {
    const now = new Date();
    const minutesNow = now.getHours() * 60 + now.getMinutes();

    // Fetch routes with stops populated
    const routes = await Route.find().populate("stops").lean();

    // Fetch all buses
    const buses = await Bus.find();

    for (const bus of buses) {
      // Get today’s trips for this bus, sorted by departureTime
      const trips = await Trip.find({
        busRegNo: bus.regNo,
        date: now.toISOString().slice(0, 10), // "YYYY-MM-DD"
      })
        .sort({ departureTime: 1 })
        .lean();

      if (trips.length === 0) {
        // Bus is off-duty or no trips today → keep last known location
        continue;
      }

      let location = { ...bus.location };

      for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        const route = routes.find((r) => r._id === trip.routeId);
        if (!route) continue;

        if (minutesNow < trip.departureTime) {
          // Bus has not started this trip
          location = { ...location }; // stay at last known location or origin
          break;
        } else if (
          minutesNow >= trip.departureTime &&
          minutesNow <= trip.arrivalTime
        ) {
          // Bus is on this trip
          const stop = pickRandomStop(route);
          if (stop) {
            location = { lat: stop.lat, lon: stop.lon, updatedAt: now };
          }
          break;
        } else if (minutesNow > trip.arrivalTime) {
          // Bus has completed this trip
          // If there is a next trip, stay at destination until next departure
          const nextTrip = trips[i + 1];
          if (nextTrip && minutesNow < nextTrip.departureTime) {
            // Place at destination of this trip
            if (route.stops.length > 0) {
              const lastStop = route.stops[route.stops.length - 1];
              location = {
                lat: lastStop.lat,
                lon: lastStop.lon,
                updatedAt: now,
              };
            }
            break;
          } else if (!nextTrip) {
            // Last trip finished → stay at last destination
            if (route.stops.length > 0) {
              const lastStop = route.stops[route.stops.length - 1];
              location = {
                lat: lastStop.lat,
                lon: lastStop.lon,
                updatedAt: now,
              };
            }
          }
        }
      }

      // Update bus location in DB
      await Bus.updateOne({ _id: bus._id }, { $set: { location } });
    }

    console.log("Bus locations updated");
  } catch (err) {
    console.error("Error updating bus locations:", err);
  }
}
