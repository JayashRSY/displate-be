import DesignModel from "../models/design.model.js";
import { errorHandler } from "../utilities/error.js"

export const createDesigns = async (req, res, next) => {
    try {
        const { designURLs, name, description, theme, medium, genre, period, brand, color, artist, tags } = req.body;
        if (!designURLs.length) next(errorHandler(400, "Please upload at least one file"));
        let createdDesigns = [];
        for (const url of designURLs) {
            createdDesigns.push(await DesignModel.create({
                url, name, description, theme, medium, genre, period, brand, color, artist, tags
            }));
        }
        res.status(201)
            .json({
                success: true,
                message: "Designs created successfully",
                data: createdDesigns,
            })
    } catch (error) {
        next(error);
    }
}
export const getAllDesigns = async (req, res, next) => {
    console.log("🚀 ~ file: design.controller.js:25 ~ req:", req.user);
    try {
        const allDesigns = await DesignModel.find({}).lean();
        res.status(200)
            .json({
                success: true,
                message: "Designs fetched successfully",
                data: allDesigns,
            })
    } catch (error) {
        next(error);
    }
}
export const getDesignById = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await UserModel.find({ email }, 'username email profilePicture roles updatedAt createdAt').lean();
        if (!user) next(errorHandler(404, `No user found with emailId: ${email}`));
        res.status(200)
            .json({
                success: true,
                message: "User fetched successfully",
                data: user,
            })
    } catch (error) {
        next(error);
    }
}
export const deleteDesignById = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await UserModel.findOneAndDelete({ email }, 'username email roles updatedAt createdAt').lean();
        if (!user) next(errorHandler(404, `No user found with emailId: ${email}`));
        res.status(200)
            .json({
                success: true,
                message: "User deleted successfully",
                data: user,
            })
    } catch (error) {
        next(error);
    }
}
export const updateDesignById = async (req, res, next) => {
    try {
        const { username, email, profilePicture, roles } = req.body;

        const user = await UserModel.findOneAndUpdate(
            { email },
            { username, email, profilePicture, roles },
            { new: true }
        );
        if (!user) next(errorHandler(404, `No user found with email: ${email}`));
        res.status(200)
            .json({
                success: true,
                message: "User updated successfully",
                data: user,
            })
    } catch (error) {
        next(error);
    }
}
