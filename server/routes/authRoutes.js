import express from "express";
import { logIn, logOut, signUp } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
