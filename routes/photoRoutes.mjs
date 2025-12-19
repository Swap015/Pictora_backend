import express from "express";
import verifyToken from "../middlewares/authMiddleware.mjs";
import { getMyPhotos, getSinglePhoto, saveEditedPhoto, uploadPhotoMeta } from "../controllers/photoController.mjs";

const router = express.Router();

router.post("/", verifyToken, uploadPhotoMeta);
router.get("/my", verifyToken, getMyPhotos);
router.get("/:id", verifyToken, getSinglePhoto);
router.put("/:id", verifyToken, saveEditedPhoto); router.delete("/:id", protect, deletePhoto);


export default router;
