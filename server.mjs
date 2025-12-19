import express from 'express';
import connectDB from './configs/db.mjs';
import dotenv from 'dotenv';
dotenv.config();

import imagekitRoutes from "./routes/imagekitRoutes.mjs";
import photoRoutes from "./routes/photoRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";

const PORT = process.env.PORT;

const app = express();

connectDB();


app.use("/api/imagekit", imagekitRoutes);

app.use("/api/photos", photoRoutes);

app.use("/api/users", userRoutes);

app.listen(PORT, () => {

    console.log(`Server running on PORT ${PORT}`);

});
