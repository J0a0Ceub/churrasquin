import HttpError from "../../../domain/http-error";
import ListModel from "../../../domain/list";

export default async (owner: string) => {
  try {
    const list = await ListModel.find({ owner }).lean().exec();

    if (!list) {
      throw new HttpError("Lista nao encontrada", 404);
    }

    return list;
  } catch (error) {
    throw error;
  }
};
