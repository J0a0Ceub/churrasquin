import { combineReducers } from "@reduxjs/toolkit";
import list from "./list";
import user from "./user";
const rootReducer = combineReducers({
  user,
  list,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
