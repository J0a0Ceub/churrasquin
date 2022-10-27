import { Request, Response, NextFunction } from "express";
import HttpError from "../../../domain/http-error";
import createUser from "../services/create-user";
import { sign } from "jsonwebtoken";
import { secret } from "../../../config/auth-middleware";
import { IUser } from "../../../domain/user";

export default async (
  req: Request<any, IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new HttpError("Campos invalidos", 400);
    }

    let user = await createUser(name, email, password);

    if (user) {
      res.status(201).json({ user, token: sign({ id: user._id }, secret) });
    }
  } catch (error) {
    next(error);
  }
};
