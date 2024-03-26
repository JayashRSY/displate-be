import express from 'express';
const router = express.Router();
import {
    getAllUsers,
    getUserByEmail,
    deleteUserByEmail,
    updateUserByEmail
} from '../controllers/user.controller.js';

router.get('/getAllUsers', getAllUsers);
router.get('/getUserByEmail/:email', getUserByEmail);
router.delete('/deleteUserByEmail/:email', deleteUserByEmail);
router.put('/updateUserByEmail', updateUserByEmail);

export default router;