import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Design' }]
}, { timestamps: true });

const WishlistModel = mongoose.model("Wishlist", wishlistSchema);

export default WishlistModel;