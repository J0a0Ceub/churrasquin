import logger from "../../../config/logger";
import HttpError from "../../../domain/http-error";
import ListModel, { IList } from "../../../domain/list";

export default async (listId: string, update: IList) => {
  try {
    const { date, name, data } = update;

    let updatedList = await ListModel.findByIdAndUpdate(
      listId,
      {
        name,
        date,
        data,
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
    logger.error(error);

    throw error;
  }
};
