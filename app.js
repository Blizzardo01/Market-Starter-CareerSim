import express from "express";
import usersRouter from "./api/users.js";
import productsRouter from "#api/products";
import ordersRouter from "#api/orders";
import getUserFromToken from "#middleware/getUserFromToken";

const app = express();

app.use(express.json());

app.use(getUserFromToken);

app.get("/", (req, res) => {
  res.send("Market api running!");
});

app.use("/users", usersRouter);

app.use("/products", productsRouter);

app.use("/orders", ordersRouter);

export default app;