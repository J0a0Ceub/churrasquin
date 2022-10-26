import { NextFunction, Request, Response } from "express";
import { IProduct } from "../../../domain/list";
import addProductList from "../services/add-product-list";

export default async (
  req: Request<{ id: string }, any, IProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = req.body;
    const resProduct = await addProductList(id, product);

    res.json({ list: resProduct });
  } catch (error) {
    next(error);
  }
};
