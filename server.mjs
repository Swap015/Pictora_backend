import express from 'express';
import connectDB from './configs/db.mjs';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const app = express();

connectDB();


app.listen(PORT, () => {

    console.log(`Server running on PORT ${PORT}`);
    
});
