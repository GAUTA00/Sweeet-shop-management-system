import express from "express";
import { addSweet } from "../controllers/sweetController.js";
import { updateSweet } from "../controllers/sweetController.js";
import { deleteSweet } from "../controllers/sweetController.js";
import { getAllSweets } from "../controllers/sweetController.js";
const router = express.Router();
// Routes for sweetapp management
router.post("/addSweets", addSweet);
router.put("/updateSweet/:id", updateSweet);
router.delete("/deleteSweet/:id", deleteSweet);
router.get("/getSweets", getAllSweets)

export default router;
