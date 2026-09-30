import express from "express";
import dotenv from "dotenv";
import connectToDb from "./database/config.js";
import {createTables} from "./database/schema.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectToDb();
    // await createTables();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();
