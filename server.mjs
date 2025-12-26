import express from 'express';
import connectDB from './configs/db.mjs';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import imagekitRoutes from "./routes/imagekitRoutes.mjs";
import photoRoutes from "./routes/photoRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


connectDB();


app.use("/api/imagekit", imagekitRoutes);

app.use("/api/photos", photoRoutes);

app.use("/api/users", userRoutes);

app.listen(PORT, () => {

    console.log(`Server running on PORT ${PORT}`);

});
