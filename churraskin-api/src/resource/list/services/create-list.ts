import logger from "../../../config/logger";
import HttpError from "../../../domain/http-error";
import ListModel, { IList } from "../../../domain/list";
import getUser from "../../user/services/get-user";

export default async (list: IList) => {
  try {
    const { owner } = list;
    const hasUser = await getUser(owner.toString());

    if (!hasUser) {
      throw new HttpError("Usuario nao encontrado", 404);
    }

    let newList = new ListModel({
      ...list,
    });

    let res = await newList.save();

    return await res.toObject();
  } catch (error) {
    logger.error(error);

    throw error;
  }
};
