import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        unique: true
    },
    theme: {
        type: String
    },
    medium: {
        type: String
    },
    genre: {
        type: String
    },
    period: {
        type: String
    },
    brand: {
        type: String
    },
    color: {
        type: String
    },
    artist: {
        type: String
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const DesignModel = mongoose.model("Design", designSchema);

export default DesignModel;