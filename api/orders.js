import express from "express";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  create_order_for_user,
  get_orders_by_user_id,
  get_order_by_id,
} from "#db/queries/orders";

import {
  create_orders_products,
  get_products_by_order_id,
} from "#db/queries/orders_products";

import { get_product_by_id } from "#db/queries/products";

const ordersRouter = express.Router();

ordersRouter.post(
  "/",
  requireUser,
  requireBody(["date"]),
  async (req, res, next) => {
    try {
      const order = await create_order_for_user({
        date: req.body.date,
        note: req.body.note,
        user_id: req.user.id,
      });

      res.status(201).send(order);
    } catch (error) {
      next(error);
    }
  }
);

ordersRouter.get(
  "/",
  requireUser,
  async (req, res, next) => {
    try {
      const orders = await get_orders_by_user_id(req.user.id);

      res.send(orders);
    } catch (error) {
      next(error);
    }
  }
);

ordersRouter.post(
  "/:id/products",
  requireUser,
  requireBody(["productId", "quantity"]),
  async (req, res, next) => {
    try {
      const order = await get_order_by_id(req.params.id);

      if (!order) {
        return res.status(404).send("Order not found.");
      }

      if (order.user_id !== req.user.id) {
        return res.status(403).send("Forbidden.");
      }

      const product = await get_product_by_id(req.body.productId);

      if (!product) {
        return res.status(400).send("Product not found.");
      }

      const order_product = await create_orders_products({
        order_id: order.id,
        product_id: req.body.productId,
        quantity: req.body.quantity,
      });

      res.status(201).send(order_product);
    } catch (error) {
      next(error);
    }
  }
);

ordersRouter.get(
  "/:id/products",
  requireUser,
  async (req, res, next) => {
    try {
      const order = await get_order_by_id(req.params.id);

      if (!order) {
        return res.status(404).send("Order not found.");
      }

      if (order.user_id !== req.user.id) {
        return res.status(403).send("Forbidden.");
      }

      const products = await get_products_by_order_id(order.id);

      res.send(products);
    } catch (error) {
      next(error);
    }
  }
);

ordersRouter.get(
  "/:id",
  requireUser,
  async (req, res, next) => {
    try {
      const order = await get_order_by_id(req.params.id);

      if (!order) {
        return res.status(404).send("Order not found.");
      }

      if (order.user_id !== req.user.id) {
        return res.status(403).send("Forbidden.");
      }

      res.send(order);
    } catch (error) {
      next(error);
    }
  }
);

export default ordersRouter;