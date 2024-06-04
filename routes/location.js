// Import the Express module
import express from "express";

// Import the index controllers module
import * as WaypointResources from "../controllers/waypoint.js";
import * as SystemResources from "../controllers/system.js";

// Create an Express router
const router = express.Router();

// Create a GET route
router.get("/systems", (req, res) => SystemResources.getSystems(req, res));
router.get("/waypoints", (req, res) => WaypointResources.getWaypoints(req, res));

// Export the router
export default router;