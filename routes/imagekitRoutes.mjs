import express from "express";
import { imagekitAuth } from "../controllers/imagekitController.mjs";
import verifyToken from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get("/auth", verifyToken, imagekitAuth);

export default router;
