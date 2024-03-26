import UserModel from "../models/user.model.js";
import { errorHandler } from "../utilities/error.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await UserModel.find({}, 'username email profilePicture roles updatedAt createdAt').lean();
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
export const deleteUserByEmail = async (req, res, next) => {
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
export const updateUserByEmail = async (req, res, next) => {
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
