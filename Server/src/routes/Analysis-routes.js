import express from "express";
const router = express.Router();
import {
  deleteAnalysis,
  newAnalysis,
} from "../controllers/RezerAnalysis-controller.js";
import { getAllAnalysisOfUser, getRezerAnalysisDetailsById, getTarobAnalysisDetailsById, viewResume } from "../controllers/User-controller.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import upload from "../utils/multer.js";
import {
  deleteTarobAnalysis,
  newTarobAnalysis,
} from "../controllers/TarobPrepAnalysis-controller.js";

// rezer analysis routes
router .route("/rezer/newAnalysis") .post(authMiddleware, upload.single("resume"), newAnalysis);
router.route("/rezer/deleteAnalysis").delete(authMiddleware, deleteAnalysis);
//saved resume routes
router.route("/savedResume/view").get(authMiddleware, viewResume);
//tarobPrep routes
router .route("/tarobPrep/newAnalysis") .post(authMiddleware, upload.single("resume"), newTarobAnalysis);
router.route("/tarobPrep/deleteAnalysis").post(authMiddleware, deleteTarobAnalysis);

//get history analysis
router.route("/history/allAnalysis/:id").get(authMiddleware, getAllAnalysisOfUser);

//get analysis details by id
router.route("/rezer/analysis-details/:id").get(getRezerAnalysisDetailsById);
router.route("/tarobPrep/analysis-details/:id").get(getTarobAnalysisDetailsById);

export default router;
