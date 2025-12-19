import express from 'express';
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/userController.mjs"
import verifyToken from '../middlewares/authMiddleware.mjs';

const router = express.Router();

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser/:userId', verifyToken, getUser);
router.post('/logout', verifyToken, logoutUser);


router.post('/refresh', refreshAccessToken);



export default router;
