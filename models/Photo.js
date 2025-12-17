import mongoose from 'mongoose';


const photoSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: { type: String },
    imageUrl: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },

    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    size: { type: Number },

},
    { timestamps: true }
)


export default mongoose.model("Photo", photoSchema);