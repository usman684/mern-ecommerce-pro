import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { getCategoryById } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.get("/:id", protect, getCategoryById);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
