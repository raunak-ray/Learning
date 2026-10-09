import app from "./app.js";
import "dotenv/config";

function startServer() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
      console.log(`Server started on: http://localhost:${PORT}`);
  });
}

startServer();
