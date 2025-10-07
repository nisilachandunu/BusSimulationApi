// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // import dotenv
import busRoutes from "./routes/bus.routes.js";
import routeRoutes from "./routes/route.routes.js";
import stopRoutes from "./routes/stop.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { loadStops } from "./utils/seeders/loadStops.js";
import { loadRoutes } from "./utils/seeders/loadRoutes.js";
import { loadBuses } from "./utils/seeders/loadBuses.js";
import { updateBusLocations } from "./utils/updateBusLocations.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

dotenv.config(); // load env variables

const app = express();
const PORT = process.env.PORT || 3000; // use from .env

// Middleware
app.use(express.json());

// Swagger UI - OpenAPI docs
try {
  const openapiPath = path.join(process.cwd(), "docs", "openapi.json");
  if (fs.existsSync(openapiPath)) {
    const openapiDoc = JSON.parse(fs.readFileSync(openapiPath, "utf-8"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDoc));
    console.log("Swagger UI available at /api-docs");
  } else {
    console.warn("docs/openapi.json not found; Swagger UI not mounted");
  }
} catch (e) {
  console.warn("Failed to initialize Swagger UI:", e?.message || e);
}

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(async () => {
//     console.log("MongoDB connected");
//     try {
//       await loadStops();
//       await loadRoutes();
//       await loadBuses();
//       await updateBusLocations();
//       console.log("Seeders and updates completed");
//     } catch (scriptError) {
//       console.error("Error running seed/update scripts:", scriptError);
//     }
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
    try {
      await loadStops(); // seed stops if not present
      await loadRoutes(); // seed routes if not present
      await loadBuses(); // seed buses if not present
      await updateBusLocations(); // dynamically update bus locations
      console.log("Seeders and updates completed");
    } catch (scriptError) {
      console.error("Error running seed/update scripts:", scriptError);
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/auth", authRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
