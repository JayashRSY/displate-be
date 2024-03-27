import UserModel from "../models/user.model.js";
import { errorHandler } from "../utilities/error.js"

export const getAllUsers = async (req, res, next) => {
    console.log("🚀 ~ file: user.controller.js:5 ~ req:", req.user);
    try {
        const allUsers = await UserModel.find({}, 'username email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
                success: true,
                message: "Users fetched successfully",
                data: allUsers,
            })
    } catch (error) {
        next(error);
    }
}
export const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await UserModel.find({ email }, 'username email profilePicture role updatedAt createdAt').lean();
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
export const deleteUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await UserModel.findOneAndDelete({ email }, 'username email role updatedAt createdAt').lean();
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
export const updateUserByEmail = async (req, res, next) => {
    try {
        const { username, email, profilePicture, rols } = req.body;

        const user = await UserModel.findOneAndUpdate(
            { email },
            { username, email, profilePicture, role },
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
