// Import the Express module
import express from "express";

// Import the index controllers module
import * as resources from "../controllers/agent.js";

// Create an Express router
const router = express.Router();

// Create a GET route
router.post("/", resources.register);

// Export the router
export default router;