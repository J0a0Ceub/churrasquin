import logger from "../../../config/logger";
import HttpError from "../../../domain/http-error";
import ListModel, { IList } from "../../../domain/list";
import getUser from "../../user/services/get-user";

export default async (userId: string, listId: string) => {
  try {
    const hasUser = await getUser(userId);

    if (!hasUser) {
      throw new HttpError("Usuario nao encontrado", 404);
    }

    let res = await ListModel.findOneAndDelete(
      { owner: userId, _id: listId },
      {
        new: true,
        returnOriginal: true,
      }
    );
    return res;
  } catch (error) {
    logger.error(error);

    throw error;
  }
};
