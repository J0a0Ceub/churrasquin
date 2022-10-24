import { NextFunction, Request, Response } from "express";
import { IList } from "../../../domain/list";
import editList from "../services/edit-list";

export default async (
  req: Request<any, any, IList>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const resList = await editList(id, req.body);

    res.json({ list: resList });
  } catch (error) {
    next(error);
  }
};
