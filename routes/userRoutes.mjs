import express from 'express';
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/userController.mjs"
import verifyToken from '../middlewares/authMiddleware.mjs';
import { refreshAccessToken } from '../controllers/refreshToken.mjs';

const router = express.Router();

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser/:userId', verifyToken, getUser);
router.post('/logout', verifyToken, logoutUser);


router.post('/refresh', verifyToken, refreshAccessToken);



export default router;
