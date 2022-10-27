import { hashSync } from "bcryptjs";
import { MongoError } from "mongodb";
import mongoose, { Error } from "mongoose";
import logger from "../../../config/logger";
import HttpError from "../../../domain/http-error";
import UserModel, { IUser } from "../../../domain/user";

export default async (name: string, email: string, password: string) => {
  try {
    const userModel = new UserModel({
      name,
      email,
      password: hashSync(password, 10),
    });

    let res = await userModel.save();

    let newUser = await res.toObject();
    return {
      ...newUser,
      password: undefined,
    };
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      logger.error("validation error", error);
    } else if ((error as MongoError).code === 11000) {
      throw new HttpError("Email já cadastrado", 400);
    }
    throw error;
  }
};
