import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["theme", "medium", "genre", "period", "brand", "color", "artist"],
        required: true
    }
}, { timestamps: true });

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;