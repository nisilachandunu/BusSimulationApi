// generateTrips.js
import fs from "fs";
import dayjs from "dayjs";
import { baseSchedules } from "../../constants/baseSchedules.js";

const buses = JSON.parse(fs.readFileSync("./constants/buses.json", "utf-8"));

// Helper: "HH:mm" → minutes since midnight
function hhmmToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// Group buses by routeCode for easy lookup
function groupBusesByRoute(buses) {
  const map = {};
  buses.forEach((bus) => {
    if (!map[bus.routeCode]) map[bus.routeCode] = [];
    map[bus.routeCode].push(bus);
  });
  return map;
}

// Assign buses to schedules respecting A/B cycles
function assignTripsToBuses(date, baseSchedules, busesByRoute) {
  const trips = [];

  Object.entries(baseSchedules).forEach(([routeKey, schedules]) => {
    const baseRoute = routeKey.replace(/[AB]$/, ""); // "01A" -> "01"
    const routeBuses = busesByRoute[baseRoute] || [];

    if (routeBuses.length === 0) {
      console.warn(`No buses found for route ${baseRoute}`);
      return;
    }

    // Determine A/B assignment based on routeKey
    let busOrder;
    if (routeKey.endsWith("A")) {
      // For "A" trips, first half morning, second half evening
      busOrder = [...routeBuses];
    } else {
      // For "B" trips, reverse the order to match return trips
      busOrder = [...routeBuses]
        .slice(Math.floor(routeBuses.length / 2))
        .concat([...routeBuses].slice(0, Math.floor(routeBuses.length / 2)));
    }

    schedules.forEach((sch, i) => {
      const bus = busOrder[i % busOrder.length]; // pick bus according to cycle
      trips.push({
        routeId: routeKey,
        busRegNo: bus.regNo,
        departureTime: hhmmToMinutes(sch.departure),
        arrivalTime: hhmmToMinutes(sch.arrival),
        date,
      });
    });
  });

  console.log(`Generated ${trips.length} trips for ${date}`);
  return trips;
}

// Main generator
export function generateTrips(startDate, days = 7) {
  const trips = [];
  const busesByRoute = groupBusesByRoute(buses);

  const start = dayjs(startDate);
  for (let d = 0; d < days; d++) {
    const date = start.add(d, "day").format("YYYY-MM-DD");
    const dayTrips = assignTripsToBuses(date, baseSchedules, busesByRoute);
    trips.push(...dayTrips);
  }

  return trips;
}

// CLI usage
if (process.argv[1].includes("generateTrips.js")) {
  const startDate = process.argv[2] || dayjs().format("YYYY-MM-DD");
  const trips = generateTrips(startDate, 7);
  fs.writeFileSync("trips.json", JSON.stringify(trips, null, 2));
  console.log(`Generated ${trips.length} trips from ${startDate}`);
}
