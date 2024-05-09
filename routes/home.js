// Import the Express module
import express from "express";

// Import the index controllers module
import * as resources from "../controllers/home.js";

// Create an Express router
const router = express.Router();

// Create a GET route
// router.get("/", resources);

// Export the router
export default router;