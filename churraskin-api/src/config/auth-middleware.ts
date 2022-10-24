import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import HttpError from "../domain/http-error";

export const secret: string = process.env.SECRET || "";

const authMiddlerware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new HttpError("Token não enviado", 400));
    }

    const decoded = verify(token, secret) as any;
    req.body.userId = decoded.id;
    return next();
  } catch (error) {
    next(error);
  }
};

export default authMiddlerware;
