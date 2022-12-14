import logger from "../../../config/logger";
import HttpError from "../../../domain/http-error";
import ListModel, { IList } from "../../../domain/list";
import getUser from "../../user/services/get-user";

export default async (userId: string, list: IList) => {
  try {
    const hasUser = await getUser(userId);

    if (!hasUser) {
      throw new HttpError("Usuario nao encontrado", 404);
    }

    let newList = new ListModel({
      ...list,
      owner: userId,
      _id: undefined,
    });

    let res = await newList.save();

    return await res.toObject();
  } catch (error) {
    logger.error(error);

    throw error;
  }
};
