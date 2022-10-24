import mongoose, { Connection } from "mongoose";
import "dotenv/config";

let database: typeof mongoose | null = null;

const URL = process.env.DB_URL;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const db = process.env.DB_NAME;
const port = process.env.DB_PORT;

export default async () => {
  let url = "";
  // if (process.env.NODE_ENV === "development") {
  // } else {
  //   url = `mongodb+srv://${user}:${password}@${URL}/`;
  // }
  url = `mongodb://${user}:${password}@${URL}:${port}`;
  if (!database) {
    database = await mongoose.connect(url, { dbName: db });
  }

  return database;
};
