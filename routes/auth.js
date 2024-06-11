import { Router } from "express";
import express from "express";

import { register } from "../controllers/auth.js";
// import validation here

const router = express.Router();

router.post("/register", (req, res) => register(req, res));
router.post("/login", (req, res) => login(req, res));

export default router;
