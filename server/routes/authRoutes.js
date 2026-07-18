import express from "express";
import {
  forgotPassword,
  getAllUsers,
  logIn,
  logOut,
  resetPassword,
  signUp,
  updateUserRole,
} from "../controllers/authController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/users", protect, admin, getAllUsers);
router.put("/users/:id/role", protect, admin, updateUserRole);
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
