import { NextFunction, Request, Response } from "express";
import HttpError from "../../../domain/http-error";
import { IList } from "../../../domain/list";
import getListById from "../services/get-list-by-id";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    let list: IList | null;

    if (!id) {
      throw new HttpError("campo id invalido", 400);
    }

    list = await getListById(id, userId);

    if (!list) {
      throw new HttpError("lista nao encontrada", 404);
    }

    res.json({ list });
  } catch (error) {
    next(error);
  }
};
