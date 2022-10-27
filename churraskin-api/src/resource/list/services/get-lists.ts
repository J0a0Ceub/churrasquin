import mongoose from "mongoose";
import HttpError from "../../../domain/http-error";
import ListModel from "../../../domain/list";

export default async (owner: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(owner);
    const list = await ListModel.aggregate([
      {
        $match: {
          owner: objectId,
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "shared",
          pipeline: [{ $project: { email: 1 } }],
          as: "shared",
        },
      },
    ]);

    if (!list) {
      throw new HttpError("Lista nao encontrada", 404);
    }

    return list;
  } catch (error) {
    throw error;
  }
};
