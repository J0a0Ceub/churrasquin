import HttpError from "../../../domain/http-error";
import ListModel, { IProduct } from "../../../domain/list";

export default async (listId: string, product: IProduct) => {
  try {
    // destruindo objeto para nao receber valores invalidos como _id
    const { name, category, quantity } = product;
    let updatedList = await ListModel.findByIdAndUpdate(
      listId,
      {
        $push: {
          data: { name, category, quantity },
        },
      },
      {
        new: true,
      }
    )
      .lean()
      .exec();

    if (!updatedList) {
      throw new HttpError("Lista nao encontrada", 404);
    }

    return updatedList;
  } catch (error) {
    throw error;
  }
};
