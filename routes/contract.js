// Import the Express module
import express from "express";

// Import the index controllers module
import * as resources from "../controllers/getContract.js";

// Create an Express router
const router = express.Router();

// Create a GET route
router.get("/:userId", resources);

// Export the router
export default router;