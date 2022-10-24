import { NextFunction, Request, Response } from "express";
import { IList } from "../../../domain/list";
import getListById from "../services/get-list-by-id";
import getLists from "../services/get-lists";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    let lists: IList[] | IList = [];

    lists = await getLists(userId);

    res.json({ lists });
  } catch (error) {
    next(error);
  }
};
