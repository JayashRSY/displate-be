import express from 'express';
const router = express.Router();
import {
    createDesigns,
    getAllDesigns,
    getDesignById,
    deleteDesignById,
    updateDesignById
} from '../controllers/design.controller.js';


router.post('/createDesigns', createDesigns);
router.get('/getAllDesigns', getAllDesigns);
router.get('/getDesignById/:id', getDesignById);
router.delete('/deleteDesignById/:email', deleteDesignById);
router.put('/updateDesignById', updateDesignById);

export default router;