import express from "express";
import verifyToken from "../middlewares/authMiddleware.mjs";
import { deletePhoto, getMyPhotos, getSinglePhoto, saveEditedPhoto, uploadPhotoMeta } from "../controllers/photoController.mjs";

const router = express.Router();

router.post("/uploadPic", verifyToken, uploadPhotoMeta);
router.get("/getMyPics", verifyToken, getMyPhotos);
router.get("/:id", verifyToken, getSinglePhoto);
router.put("/save/:id", verifyToken, saveEditedPhoto);
router.delete("deletePic/:id", verifyToken, deletePhoto);


export default router;
