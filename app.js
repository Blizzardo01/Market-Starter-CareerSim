import express from "express";
import usersRouter from "./api/users.js";
import productsRouter from "./api/products.js";
import ordersRouter from "./api/orders.js";
import getUserFromToken from "./middleware/getUserFromToken.js";

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