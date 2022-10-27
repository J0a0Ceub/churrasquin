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

    const users = ListModel.aggregate([
      {
        $lookup: {
          from: "shared",
          pipeline: [{ $project: { email: 1 } }],
          as: "sharedUserList",
        },
        $project: {
          sharedUserList: 1,
        },
      },
    ]);

    return users;
  } catch (error) {
    logger.error(error);

    throw error;
  }
};
