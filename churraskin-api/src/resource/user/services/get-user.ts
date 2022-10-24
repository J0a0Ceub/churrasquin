import logger from "../../../config/logger";
import HttpError from "../../../domain/http-error";
import UserModel, { IUser } from "../../../domain/user";

export default async (id?: string, email?: string) => {
  try {
    let user: IUser | null;
    if (!id && !email) {
      throw new HttpError("Parametros invalidos", 400);
    }

    if (id) {
      user = await UserModel.findById(id).lean().exec();
    } else {
      user = await UserModel.findOne({ email }).lean().exec();
    }
    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
