import express from "express";
import dotenv from "dotenv";
import connectToDb from "./database/config.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

async function startServer() {
    await connectToDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();
