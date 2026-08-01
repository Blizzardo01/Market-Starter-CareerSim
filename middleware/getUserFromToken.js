import { verifyToken } from "../utils/jwt.js";
import { get_user_by_id } from "#db/queries/users";

export default async function getUserFromToken(req, res, next) {
  const authorization = req.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next();
  }

  const token = JSON.parse(authorization.split(" ")[1]).token;

  try {
    const payload = verifyToken(token);

    const user = await get_user_by_id(payload.id);

    req.user = user;

    next();
  } catch (error) {
    next();
  }
}