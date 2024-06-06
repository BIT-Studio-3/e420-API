// Import the Express module
import express from "express";

// Import the index controllers module
import * as resources from "../controllers/agent.js";

// Create an Express router
const router = express.Router();

// Create a GET route
router.get("/", (req, res) => resources.getAgents(req, res));
router.get("/:id", (req, res) => resources.getAgent(req, res));

// Export the router
export default router;
