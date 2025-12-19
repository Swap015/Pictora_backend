import imagekit from "../utils/imagekit.mjs";

export const imagekitAuth = (req, res) => {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        res.status(200).json(authParams);
    } catch (err) {
        res.status(500).json({ msg: "ImageKit auth failed" });
    }
};


