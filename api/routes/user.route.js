import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js"; // Make sure this matches the naming

const router = express.Router();

// Define your routes here
router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
