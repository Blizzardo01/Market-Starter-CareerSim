import express from "express";
import bcrypt from "bcrypt";
import requireBody from "#middleware/requireBody";
import {
  create_user,
  get_user_by_username,
} from "#db/queries/users";
import { createToken } from "#utils/jwt";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const existingUser = await get_user_by_username(username);

      if (existingUser) {
        return res.status(400).send("Username already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await create_user({
        username,
        password: hashedPassword,
      });

      const token = createToken({
        id: user.id,
        username: user.username,
      });

      res.send({ token });
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await get_user_by_username(username);

      if (!user) {
        return res.status(401).send("Invalid credentials.");
      }

      const valid = await bcrypt.compare(
        password,
        user.password
      );

      if (!valid) {
        return res.status(401).send("Invalid credentials.");
      }

      const token = createToken({
        id: user.id,
        username: user.username,
      });

      res.send({ token });
    } catch (error) {
      next(error);
    }
  }
);

export default usersRouter;