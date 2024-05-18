import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
import UserModel from "../models/user.model.js";
import { errorHandler } from "../utilities/error.js"
import CartModel from "../models/cart.model.js";
import WishlistModel from "../models/wishlist.model.js";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 12); // hashSync is asynchronous (no need for await)
        const user = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (user) { return next(new Error('User already exists')) }
        console.log("✅16");
        const newCart = await CartModel.create({});
        console.log("🚀 ~ file: auth.controller.js:17 ~ newCart:", newCart);
        const newWishlist = await WishlistModel.create({});
        console.log("🚀 ~ file: auth.controller.js:19 ~ newWishlist:", newWishlist);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            role: 'user',
            cart: newCart._id,
            wishlist: newWishlist._id
        });
        console.log("✅25");

        console.log("🚀 ~ file: auth.controller.js:25 ~ newUser:", newUser);
        await newUser.save();
        res.status(201)
            .json({
                success: true,
                message: "User created successfully",
                data: newUser,
            })
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await UserModel.findOne({ email });
        if (!validUser) next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) next(errorHandler(401, "Invalid password"));
        const token = jwt.sign({
            id: validUser._id,
            email: validUser.email,
            username: validUser.username,
            role: validUser.role,
            cart: validUser.cart,
            wishlist: validUser.wishlist
        }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const { password: hashedPassword, ...userDetails } = validUser._doc;
        res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 3600000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : false
        })
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
                data: userDetails,
            })
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        const { idToken } = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        if (!ticket.getPayload().email_verified) res.errorHandler(401, "Email not verified");

        const { email: email, name: displayName, picture: photoURL } = ticket.getPayload();

        let user = await UserModel.findOne({ email });
        if (user) {
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                cart: user.cart,
                wishlist: user.wishlist
            }, process.env.JWT_SECRET, { expiresIn: '24h' });
            const { password: hashedPassword, ...userDetails } = user._doc;
            res.cookie('accessToken', token, {
                httpOnly: true,
                maxAge: 3600000,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : false
            })
                .status(200)
                .json({
                    success: true,
                    message: "User logged in successfully",
                    data: userDetails,
                })
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);
            const newCart = await CartModel.create({});
            const newWishlist = await WishlistModel.create({});
            const newUser = new UserModel({
                username: displayName.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email,
                password: hashedPassword,
                profilePicture: photoURL,
                role: 'user',
                cart: newCart._id,
                wishlist: newWishlist._id
            });
            const result = await newUser.save();
            const token = jwt.sign({ id: result._id, email: result.email, username: result.username, role: result.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
            const { password: savedHashedPassword, ...userDetails } = result._doc;
            res.cookie('accessToken', token, {
                httpOnly: true,
                maxAge: 3600000,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : false
            })
                .status(201)
                .json({
                    success: true,
                    message: "User created successfully",
                    data: userDetails,
                })
        }
    } catch (error) {
        next(error);
    }
}

export const signout = (req, res) => {
    res.clearCookie('accessToken').status(200).json({ success: true, message: 'Signout success!' });
};
