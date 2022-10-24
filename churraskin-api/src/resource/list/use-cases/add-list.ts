import { NextFunction, Request, Response } from "express";
import { IList } from "../../../domain/list";
import createList from "../services/create-list";

export default async (
  req: Request<any, any, { list: IList }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { list } = req.body;

    const resList = await createList(list);

    res.json({
      list: resList,
    });
  } catch (error) {
    next(error);
  }
};
