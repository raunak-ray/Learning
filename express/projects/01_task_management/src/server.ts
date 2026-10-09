import "dotenv/config";
import connectToDb from "./database/config.js";
// import {createTables} from "./database/schema.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

async function startServer(): Promise<void> {
    await connectToDb();
    // await createTables();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();
