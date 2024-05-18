import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Design'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            default: 0
        }
    }]
}, { timestamps: true });

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;