import { model, Schema, Types } from "mongoose";

export type IUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
};

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
