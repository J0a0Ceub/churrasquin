import { model, Schema, Types } from "mongoose";

export type IProduct = {
  _id: Types.ObjectId;
  name: string;
  quantity: number;
  category: string;
};

export type IList = {
  _id: Types.ObjectId;
  name: string;
  date: string;
  owner: Types.ObjectId;
  data: IProduct[];
  shared: string[];
};

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
});

const listSchema = new Schema<IList>(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    data: { type: [productSchema] },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    shared: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const ListModel = model<IList>("List", listSchema);

export default ListModel;
