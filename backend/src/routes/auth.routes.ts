import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Route publique d'inscription étudiant
router.post('/register', AuthController.register);

// Route publique de connexion
router.post('/login', AuthController.login);

// Route publique de rafraîchissement de token
router.post('/refresh-token', AuthController.refreshToken);

// Route protégée pour récupérer le profil
router.get('/profile', authenticate, AuthController.getProfile);

export default router;