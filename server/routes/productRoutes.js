import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteProductReview,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, admin, createProduct);
router.post("/:id/reviews", protect, createProductReview);

router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.delete("/:id/reviews/:reviewed", protect, deleteProductReview);

export default router;
