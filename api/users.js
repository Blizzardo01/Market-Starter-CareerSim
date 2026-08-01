import express from "express";
import bcrypt from "bcrypt";
import requireBody from "#middleware/requireBody";
import {
  createUser,
  getUserByUsername,
} from "#db/queries/users";
import { createToken } from "#utils/jwt";

const router = express.Router();

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const existingUser = await getUserByUsername(username);

      if (existingUser) {
        return res.status(400).send("Username already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await createUser({
        username,
        password: hashedPassword,
      });

      const token = createToken(user);

      res.send({ token });
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await getUserByUsername(username);

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

      const token = createToken(user);

      res.send({ token });
    } catch (error) {
      next(error);
    }
  }
);

export default router;