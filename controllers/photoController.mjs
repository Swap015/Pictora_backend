import Photo from "../models/Photo.js";
import imagekit from "../utils/imagekit.mjs";

export const uploadPhotoMeta = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            imageId,
            width,
            height,
            format,
            size,
            canvasData
        } = req.body;


        if (!imageUrl || !imageId) {
            return res.status(400).json({
                msg: "Image data is required"
            });
        }

        const photo = await Photo.create({
            user: req.user.userId,
            title,
            imageUrl,
            imageId,
            width,
            height,
            format,
            size,
            canvasData
        });

        res.status(201).json({
            msg: "Photo saved successfully",
            photo
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Failed to save photo"
        });
    }
};


export const getMyPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({ user: req.user.userId })
            .sort({ createdAt: -1 });

        res.status(200).json({ photos });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Failed to fetch photos"
        });
    }
};


export const getSinglePhoto = async (req, res) => {
    try {
        const photo = await Photo.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!photo) {
            return res.status(404).json({
                msg: "Photo not found"
            });
        }

        res.status(200).json({ photo });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Failed to fetch photo"
        });
    }
};


export const saveEditedPhoto = async (req, res) => {
    try {
        const { editedUrl, imageId, canvasData } = req.body;

        if (!editedUrl || !imageId) {
            return res.status(400).json({
                msg: "Edited image data is required"
            });
        }

        const photo = await Photo.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!photo) {
            return res.status(404).json({
                msg: "Photo not found"
            });
        }

        photo.editedUrl = editedUrl;
        photo.imageId = imageId;
        photo.canvasData = canvasData;
        photo.isEdited = true;

        await photo.save();

        res.status(200).json({
            msg: "Edited photo saved successfully",
            photo
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Failed to save edited photo"
        });
    }
};



export const deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!photo) {
            return res.status(404).json({
                msg: "Photo not found"
            });
        }

        // delete image from ImageKit
        await imagekit.deleteFile(photo.imageId);

        // delete from database
        await photo.deleteOne();

        res.status(200).json({
            msg: "Photo deleted successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Failed to delete photo"
        });
    }
};
