import { createAction, createReducer } from "@reduxjs/toolkit";
import { IUser } from "../../types";

interface UserState {
  user: IUser;
  logged: boolean;
}

const initialState: UserState = {
  user: {
    name: "",
    email: "",
  },
  logged: false,
};

export const addUser = createAction<IUser>("user/add");
export const removeUser = createAction("user/remove");

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addUser, (state, action) => {
      state.logged = true;
      state.user = action.payload;
    })
    .addCase(removeUser, (state, action) => {
      state = initialState;
    });
});
