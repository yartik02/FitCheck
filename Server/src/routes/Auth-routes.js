import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import {
  signUp,
  loginUser,
  userData,
  logout,
  changePassword,
  changeName
} from "../controllers/User-controller.js";

router.post("/signUp", signUp);
router.post("/login", loginUser);
router.route("/user-details").get(authMiddleware, userData);
router.route("/logout").post(authMiddleware, logout);
router.route("/changePassword").patch(authMiddleware, changePassword);
router.route("/changeName").patch(authMiddleware, changeName);

export default router;