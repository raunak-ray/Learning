import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
})

const products = [
  { id: 1, name: "Keyboard" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Speaker" },
];

app.get("/", (req, res) => {
  // res.send('Hello world!');
  res.json({
    message: "Hello world!",
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
})

app.post("/submit", (req, res) => {
  console.log(req.body);
  const {name} = req.body;
  res.json({
    message: `Hello ${name}`,
  })
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
