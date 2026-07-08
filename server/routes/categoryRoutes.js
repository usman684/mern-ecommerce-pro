import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, admin, createCategory);

router.get("/:id", getCategoryById);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
