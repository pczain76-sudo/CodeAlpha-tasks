import express from 'express';
import { createPost, getAllPosts, likePost, commentOnPost } from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', protect, getAllPosts);
router.put('/like/:id', protect, likePost);
router.put('/comment/:id', protect, commentOnPost);

export default router;