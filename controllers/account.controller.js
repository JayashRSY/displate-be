import CartModel from "../models/cart.model.js";
import DesignModel from "../models/design.model.js";
import WishlistModel from "../models/wishlist.model.js";
import mongoose from "mongoose";
import { errorHandler } from "../utilities/error.js"

export const addToCart = async (req, res, next) => {
    try {
        const validProduct = await DesignModel.findById(req.body.productId).lean();
        if (!validProduct) next(errorHandler(404, "Product not found"));
        let updatedCart = await CartModel.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(req.user.id),
                'products.product': new mongoose.Types.ObjectId(req.body.productId)
            },
            {
                $set: { 'products.$.quantity': req.body.quantity || 1 }
            },
            { new: true }
        );

        if (!updatedCart) {
            // If the product does not exist in the cart, add it with the given quantity
            updatedCart = await CartModel.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.user.id) },
                {
                    $push: {
                        products: {
                            product: new mongoose.Types.ObjectId(req.body.productId),
                            quantity: req.body.quantity || 1
                        }
                    }
                },
                { upsert: true, new: true }
            );
        }

        console.log("🚀 ~ file: account.controller.js:15 ~ updatedCart:", updatedCart);
        res.status(200)
            .json({
                success: true,
                message: "Cart updated successfully",
                data: updatedCart,
            })
    } catch (error) {
        next(error);
    }
}

export const getCart = async (req, res, next) => {
    console.log("🚀 ~ file: account.controller.js:37 ~ req:", req.user.id);
    try {
        console.log("🚀 ~ file: account.controller.js:39 ~ req.user.id:", req.user.id);
        const cart = await CartModel.findById(req.user.id).populate('products.product').lean();
        if (!cart) next(errorHandler(404, "Cart not found"));
        res.status(200)
            .json({
                success: true,
                message: "Cart fetched successfully",
                data: cart.products,
            })
    } catch (err) {
        next(err);
    }
}

export const emptyCart = async (req, res, next) => {
    try {
        console.log("🚀 ~ file: account.controller.js:71 ~ req.user.id:", req.user.id);
        const updatedCart = await CartModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.user.id) },
            { $set: { products: [] } },
            { new: true }
        );
        console.log("🚀 ~ file: account.controller.js:74 ~ updatedCart:", updatedCart);
        res.status(200)
            .json({
                success: true,
                message: "Cart updated successfully",
                data: updatedCart,
            })
    } catch (error) {
        next(error);
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        const updatedCart = await CartModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.user.id) },
            { $pull: { products: { product: new mongoose.Types.ObjectId(req.body.productId) } } },
            { new: true }
        );
        console.log("🚀 ~ file: account.controller.js:92 ~ updatedCart:", updatedCart);
        res.status(200)
            .json({
                success: true,
                message: "Cart updated successfully",
                data: updatedCart,
            })
    } catch (error) {
        next(error);
    }
}

export const addToWishlist = async (req, res, next) => {
    try {
        const validProduct = await DesignModel.findById(req.body.productId).lean();
        if (!validProduct) next(errorHandler(404, "Product not found"));
        let updatedWishlist = await WishlistModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.user.id) },
            { $addToSet: { products: new mongoose.Types.ObjectId(req.body.productId) } },
            { upsert: true, new: true }
        );
        res.status(200)
            .json({
                success: true,
                message: "Added to wishlist successfully",
                data: updatedWishlist,
            })
    } catch (error) {
        next(error);
    }
}
export const getWishlist = async (req, res, next) => {
    try {
        const wishlist = await WishlistModel.findById(req.user.id).populate('products').lean();
        if (!wishlist) next(errorHandler(404, "Wishlist not found"));
        res.status(200)
            .json({
                success: true,
                message: "Wishlist fetched successfully",
                data: wishlist.products,
            })
    } catch (err) {
        next(err);
    }
}
export const removeFromWishlist = async (req, res, next) => {
    try {
        const updatedWishlist = await WishlistModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.user.id) },
            { $pull: { products: new mongoose.Types.ObjectId(req.body.productId) } },
            { new: true }
        );
        res.status(200)
            .json({
                success: true,
                message: "Removed from wishlist successfully",
                data: updatedWishlist,
            })
    } catch (error) {
        next(error);
    }
}
export const emptyWishlist = async (req, res, next) => {
    try {
        const updatedWishlist = await WishlistModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.user.id) },
            { $set: { products: [] } },
            { new: true }
        );
        res.status(200)
            .json({
                success: true,
                message: "Wishlist updated successfully",
                data: updatedWishlist,
            })
    } catch (error) {
        next(error);
    }
}