import { NextFunction, Request, Response } from "express";
import { IProduct } from "../../../domain/list";
import editProduct from "../services/edit-product";

export default async (
  req: Request<{ listId: string; productId: string }, any, IProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId, productId } = req.params;

    const product = req.body;

    const resProduct = await editProduct(listId, productId, product);

    res.json({ list: resProduct });
  } catch (error) {
    next(error);
  }
};
