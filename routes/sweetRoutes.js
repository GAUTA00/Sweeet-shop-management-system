import express from "express";
import { addSweet } from "../controllers/sweetController.js";
import { updateSweet } from "../controllers/sweetController.js";
import { deleteSweet } from "../controllers/sweetController.js";
import { getAllSweets } from "../controllers/sweetController.js";
import { searchSweets } from "../controllers/sweetController.js";
import { purchaseSweet } from "../controllers/sweetController.js";
import { restockSweet } from "../controllers/sweetController.js";
const router = express.Router();
// Routes for sweetapp management
router.post("/addSweets", addSweet);
router.put("/updateSweet/:id", updateSweet);
router.delete("/deleteSweet/:id", deleteSweet);
router.get("/getSweets", getAllSweets);
router.get("/searchSweets", searchSweets);
router.put("/purchaseSweet/:id", purchaseSweet);
router.put("/restockSweet/:id", restockSweet);

export default router;
