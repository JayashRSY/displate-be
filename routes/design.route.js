import express from 'express';
const router = express.Router();
import {
    createDesigns,
    getAllDesigns,
    getDesignById,
    deleteDesignById,
    updateDesignById
} from '../controllers/design.controller.js';
import { verifyToken } from '../utilities/verifyToken.js';

router.post('/createDesigns', verifyToken, createDesigns);
router.get('/getAllDesigns', getAllDesigns);
router.get('/getDesignById/:id', getDesignById);
router.delete('/deleteDesignById/:email', verifyToken, deleteDesignById);
router.put('/updateDesignById', verifyToken, updateDesignById);

export default router;