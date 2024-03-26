import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg",
    },
    roles: {
        type: [String],
        default: []
    },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;