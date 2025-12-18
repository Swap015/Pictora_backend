import mongoose from 'mongoose';


const photoSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    editedUrl: {
        type: String
    },
    imageId: {
        type: String,
        required: true
    },
    isEdited: {
        type: Boolean,
        default: false
    },

    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    size: { type: Number },
    canvasData: {
        type: Object,
        default: null
    }




},
    { timestamps: true }
)


export default mongoose.model("Photo", photoSchema);