import { Router } from 'express';
import { authController, userController } from '../controllers/authController';
import { authenticateJwt } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import { validateRequest, registerSchema, loginSchema } from '../validators/schemas';

export const authRouter = Router();

authRouter.post('/register', validateRequest(registerSchema), (req, res, next) => authController.register(req, res, next));
authRouter.post('/login', validateRequest(loginSchema), (req, res, next) => authController.login(req, res, next));
authRouter.get('/me', authenticateJwt, (req, res, next) => authController.getMe(req, res, next));
authRouter.post('/logout', (req, res) => authController.logout(req, res));

export const userRouter = Router();

userRouter.get('/me', authenticateJwt, (req, res, next) => userController.getMe(req, res, next));
userRouter.put('/me', authenticateJwt, (req, res, next) => userController.updateMe(req, res, next));
userRouter.get('/', authenticateJwt, authorizeRoles('admin'), (req, res, next) => userController.getAllUsers(req, res, next));
userRouter.get('/:id', authenticateJwt, authorizeRoles('admin'), (req, res, next) => userController.getUserById(req, res, next));
