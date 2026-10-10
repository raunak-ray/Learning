import app from "./app.js";
import "dotenv/config";
import { connectDB } from "./db/config.js";

async function startServer() {
  const PORT = process.env.PORT || 3000;

  await connectDB();

  app.listen(PORT, () => {
    
      console.log(`Server started on: http://localhost:${PORT}`);
  });
}

startServer();
