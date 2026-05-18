import express from 'express';
import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getProfile} from '../controllers/user.controller.js';
import { userAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/profile', userAuth, getProfile);

export default router;