import { NextFunction, Request, Response } from "express";
import deleteList from "../services/delete-list";

export default async (
  req: Request<{ listId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const { listId } = req.params;
    const result = await deleteList(userId, listId);

    res.json({ list: result });
  } catch (error) {
    next(error);
  }
};
