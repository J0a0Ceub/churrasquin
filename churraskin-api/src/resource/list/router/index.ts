import { Router } from "express";
import authMiddlerware from "../../../config/auth-middleware";
import addList from "../use-cases/add-list";
import addProduct from "../use-cases/add-product";
import editProduct from "../use-cases/edit-product";
import getLists from "../use-cases/get-lists";
import getListsById from "../use-cases/get-list-by-id";
import updateList from "../use-cases/update-list";

const listRouter = Router();

listRouter.get("/lists", [authMiddlerware], getLists);
listRouter.get("/list/:id", [authMiddlerware], getListsById);
listRouter.post("/list/add", [authMiddlerware], addList);
listRouter.patch("/list/:id", [authMiddlerware], updateList);
listRouter.post("/list/:id/add-product", [authMiddlerware], addProduct);
listRouter.patch(
  "/list/:listId/edit-product/:productId",
  [authMiddlerware],
  editProduct
);

export default listRouter;
