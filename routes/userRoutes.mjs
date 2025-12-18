import express from 'express';
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/userController.mjs"

const router = express.Router();

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser/:userId', verifyToken, getUser);
router.post('/logout', verifyToken, logoutUser);

//refresh access token
router.post('/refresh', refreshAccessToken);



export default router;
