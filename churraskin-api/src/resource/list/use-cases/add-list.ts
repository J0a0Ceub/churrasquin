import { NextFunction, Request, Response } from "express";
import { IList } from "../../../domain/list";
import createList from "../services/create-list";

export default async (
  req: Request<any, any, { list: IList; userId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { list, userId } = req.body;

    const resList = await createList(userId, list);

    res.status(201).json({
      list: resList,
    });
  } catch (error) {
    next(error);
  }
};
