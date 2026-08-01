import express from "express";
import requireUser from "#middleware/requireUser";
import {
  get_all_products,
  get_product_by_id,
  get_orders_by_product_id,
} from "#db/queries/products";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await get_all_products();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id/orders", requireUser, async (req, res, next) => {
  try {
    const product = await get_product_by_id(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    const orders = await get_orders_by_product_id(
      req.params.id,
      req.user.id
    );

    res.send(orders);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await get_product_by_id(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
});

export default productsRouter;