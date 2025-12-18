import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import ms from 'ms';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtil.mjs';

const isProduction = process.env.NODE_ENV === "production";
const ACCESS_EXPIRY = process.env.ACCESS_EXPIRY;
const REFRESH_EXPIRY = process.env.REFRESH_EXPIRY;

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        if (password.length < 5) {
            return res.status(400).json({ msg: "Password must be at least 5 characters." });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPass });

        await user.save();
        res.status(201).json({
            msg: "Registration Successful ",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Registration Failed " });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are  required" });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: ms(ACCESS_EXPIRY)
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: ms(REFRESH_EXPIRY)
        });

        res.status(200).json({
            msg: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }

    catch (err) {
        res.status(500).json({ msg: "Login failed", error: err.message });

    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: "Failed to fetch user" });
    }
};

export const logoutUser = async (req, res) => {

    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(401).json({ msg: "something's wrong" });
        }
        user.refreshToken = null;
        await user.save();
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        res.status(200).json({ msg: "Logged Out" });
    }
    catch (err) {
        res.status(404).json({ msg: "User not found" });
    }
};