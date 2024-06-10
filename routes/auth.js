import { Router } from "express";
import express from "express";

import { register, login } from "../controllers/auth.js";
// import validation here

const router = express.Router();

router.post("/register", (req, res) => register(req, res));
router.route("/login").post(login);

export default router;
