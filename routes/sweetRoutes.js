import express from "express";
import { addSweet } from "../controllers/sweetController.js";

const router = express.Router();
// Routes for sweetapp management
router.post("/addSweets", addSweet);
export default router;
