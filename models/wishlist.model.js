import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Design' }]
}, { timestamps: true });

const WishlistModel = mongoose.model("Wishlist", wishlistSchema);

export default WishlistModel;