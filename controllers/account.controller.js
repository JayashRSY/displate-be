import CartModel from "../models/cart.model.js";
import DesignModel from "../models/design.model.js";
import WishlistModel from "../models/wishlist.model.js";
import { errorHandler } from "../utilities/error.js"

export const addToCart = async (req, res, next) => {
    try {
        const validProduct = await DesignModel.findById(req.body.productId).lean();
        if (!validProduct) next(errorHandler(404, "Product not found"));
        let updatedCart = await CartModel.findOneAndUpdate(
            {
                _id: req.user.cart,
                'products.product': req.body.productId
            },
            {
                $set: { 'products.$.quantity': req.body.quantity || 1 }
            },
            { new: true }
        );

        if (!updatedCart) {
            // If the product does not exist in the cart, add it with the given quantity
            updatedCart = await CartModel.findOneAndUpdate(
                { _id: req.user.cart },
                {
                    $push: {
                        products: {
                            product: req.body.productId,
                            quantity: req.body.quantity || 1
                        }
                    }
                },
                { upsert: true, new: true }
            );
        }

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
    try {
        const cart = await CartModel.findById(req.user.cart).populate('products.product').lean();
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
        const updatedCart = await CartModel.findOneAndUpdate(
            { _id: req.user.cart },
            { $set: { products: [] } },
            { new: true }
        );
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
            { _id: req.user.cart },
            { $pull: { products: { product: req.body.productId } } },
            { new: true }
        );
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
            { _id: req.user.wishlist },
            { $addToSet: { products: req.body.productId } },
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
        const wishlist = await WishlistModel.findById(req.user.wishlist).populate('products').lean();
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
            { _id: req.user.wishlist },
            { $pull: { products: req.body.productId } },
            { new: true }
        );
        console.log("🚀 ~ file: account.controller.js:140 ~ updatedWishlist:", updatedWishlist);
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
            { _id: req.user.wishlist },
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