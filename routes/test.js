// Import the Express module
import express from "express";

// Import the index controllers module
import * as resources from "../controllers/system.js";

// Create an Express router
const router = express.Router();

// Create a GET route
router.get("/", (req, res) => resources.getSystems(req, res));

// Export the router
export default router;