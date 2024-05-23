// Import the Express module
import express from "express";

// Import the index controllers module
import * as resources from "../controllers/contract.js";

// Create an Express router
const router = express.Router();

// Create a POST route
router.post("/", (req, res) => resources.createContract(req, res));

// Create a GET route
router.get("/:userId", (req, res) => resources.getContracts(req, res));

// Export the router
export default router;
