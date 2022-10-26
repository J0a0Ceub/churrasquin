import { Request, Response, NextFunction } from "express";
import HttpError from "../../../domain/http-error";
import { sign } from "jsonwebtoken";
import { secret } from "../../../config/auth-middleware";
import getUser from "../services/get-user";
import { compareSync } from "bcryptjs";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new HttpError("Erro no login", 400);
    }

    let user = await getUser(userId);

    if (!user) {
      throw new HttpError("Erro ao fazer login", 400);
    }

    res.json({
      user: {
        ...user,
        password: undefined,
      },
      token: sign({ id: user._id }, secret),
    });
  } catch (error) {
    next(error);
  }
};
