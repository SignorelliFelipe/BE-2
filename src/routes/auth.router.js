import { Router } from 'express';
import passport from 'passport';
import { register, login, logout, getCurrentUser, forgotPassword, resetPassword } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/current', passport.authenticate('current', { session: false }), getCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;