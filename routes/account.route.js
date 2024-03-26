import express from 'express';
const router = express.Router();
import {
    addToCart,
    getCart,
    removeFromCart,
    emptyCart,
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    emptyWishlist
} from '../controllers/account.controller.js';


router.put('/addToCart', addToCart);
router.get('/getCart', getCart);
router.put('/removeFromCart', removeFromCart);
router.delete('/emptyCart', emptyCart);

router.put('/addToWishlist', addToWishlist);
router.get('/getWishlist', getWishlist);
router.put('/removeFromWishlist', removeFromWishlist);
router.delete('/emptyWishlist', emptyWishlist);

export default router;