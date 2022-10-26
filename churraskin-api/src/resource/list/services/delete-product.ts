import HttpError from "../../../domain/http-error";
import ListModel, { IProduct } from "../../../domain/list";

export default async (listId: string, productId: string) => {
  try {
    let list = await ListModel.findById(listId).lean().exec();

    if (!list) {
      throw new HttpError("Lista nao encontrada", 404);
    }
    if (!productId) {
      throw new HttpError("Campo de produto invalidos", 400);
    }

    let exists = list.data.find((p) => p._id?.equals(productId));

    if (!exists) {
      throw new HttpError("Produto nao existe", 404);
    }

    let nList = await ListModel.findOneAndUpdate(
      {
        _id: listId,
      },
      {
        $set: {
          data: list.data.filter((p) => !p._id.equals(productId)),
        },
      },
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return nList;
  } catch (error) {
    throw error;
  }
};
