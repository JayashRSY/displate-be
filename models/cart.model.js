import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },
        quantity: { type: Number, default: 1 }
    }]
}, { timestamps: true });

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;