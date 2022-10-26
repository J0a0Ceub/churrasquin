import { NextFunction, Request, Response } from "express";
import deleteProduct from "../services/delete-product";

export default async (
  req: Request<{ listId: string; productId: string }, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId, productId } = req.params;

    const resProduct = await deleteProduct(listId, productId);

    res.json({ list: resProduct });
  } catch (error) {
    next(error);
  }
};
