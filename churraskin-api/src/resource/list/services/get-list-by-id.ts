import ListModel from "../../../domain/list";

export default async (listId: string, owner: string) => {
  try {
    const list = await ListModel.findOne({ _id: listId, owner }).lean().exec();

    return list;
  } catch (error) {
    throw error;
  }
};
