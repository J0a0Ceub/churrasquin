export type IUser = {
  name: string;
  email: string;
};

export type IProduct = {
  _id: string;
  name: string;
  quantity: number;
  category: string;
};

export type IList = {
  _id: string;
  name: string;
  date: string;
  owner: string;
  data: IProduct[];
  shared: string[];
};

// Requests
export type LoginUserResponse = {
  user: IUser;
  token: string;
};

export type GetListsResponse = {
  lists: IList[];
};

export type EditListResponse = {
  list: IList;
};

export type IIndexable = {
  [x: string]: any;
};

export const CategoryTypes = [
  "Proteína",
  "Utilitário",
  "Tempêro",
  "Bebida",
  "Acompanhamento",
];
