import { Request, Response, NextFunction } from "express";
import HttpError from "../../../domain/http-error";
import { IUser } from "../../../domain/user";
import createUser from "../services/create-user";
import { sign } from "jsonwebtoken";
import { secret } from "../../../config/auth-middleware";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new HttpError("Campos invalidos", 400);
    }

    let user = await createUser(name, email, password);

    if (user) {
      res.json({ user, token: sign(user._id, secret) });
    }
  } catch (error) {
    next(error);
  }
};
