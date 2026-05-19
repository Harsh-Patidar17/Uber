import express from 'express';
import { Router } from 'express';
import { registercaptain, logincaptain, logoutcaptain, getProfile, toggleAvailability} from '../controllers/captain.controller.js';
import { captainAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registercaptain);
router.post('/login', logincaptain);
router.get('/logout', logoutcaptain);
router.get('/profile', captainAuth, getProfile);
router.patch('/toggele-availability', captainAuth, toggleAvailability);

export default router;