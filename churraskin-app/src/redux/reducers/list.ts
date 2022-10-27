import { createAction, createReducer } from "@reduxjs/toolkit";
import { IList } from "../../types";

interface ListState {
  data: IList[];
}

const initialState: ListState = {
  data: [],
};

export const addList = createAction<IList>("list/add");
export const editList = createAction<IList>("list/edit");
export const loadLists = createAction<IList[]>("list/load");
export const removeList = createAction<string>("list/remove");

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addList, (state, action) => {
      state.data = [...state.data, action.payload];
    })
    .addCase(editList, (state, action) => {
      state.data = state.data.map((l) =>
        l._id === action.payload._id ? action.payload : l
      );
    })
    .addCase(loadLists, (state, action) => {
      state.data = action.payload;
    })
    .addCase(removeList, (state, action) => {
      state.data = state.data.filter((l) => l._id !== action.payload);
    });
});
