import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { getUserProfile, followUser, updateProfile, searchUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile/:username', getUserProfile);
router.put('/follow/:id', protect, followUser); 
router.put('/update', protect, updateProfile);
router.get('/search', protect, searchUsers);

export default router;