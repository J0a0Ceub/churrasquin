import axios, { AxiosResponse } from "axios";
import {
  EditListResponse,
  GetListsResponse,
  IList,
  IProduct,
  LoginUserResponse,
} from "./types";

const TOKEN = "CHURRASKINTOKEN";

export const setupToken = (token: string) => {
  axios.defaults.headers.common["authorization"] = token;
  localStorage.setItem(TOKEN, token);
};
export const removeToken = () => localStorage.removeItem(TOKEN);
export const getToken = () => localStorage.getItem(TOKEN);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (!config?.headers) {
    throw new Error("config not found");
  }

  config.headers["authorization"] = token;
  return config;
});

export const handleLoginAPI = (email: string, password: string) =>
  api.post<any, AxiosResponse<LoginUserResponse>>("/login", {
    email,
    password,
  });

export const handleGetLists = () =>
  api.get<any, AxiosResponse<GetListsResponse>>("/lists");

export const handleEditProduct = (
  listId: string,
  productId: string,
  updates: Partial<IProduct>
) =>
  api.patch<any, AxiosResponse<EditListResponse>>(
    `/list/${listId}/edit-product/${productId}`,
    updates
  );

export const handleCreateProduct = (listId: string, product: IProduct) =>
  api.post<any, AxiosResponse<EditListResponse>>(
    `/list/${listId}/add-product`,
    product
  );

export const handleEditList = (listId: string, list: Partial<IList>) =>
  api.patch<any, AxiosResponse<EditListResponse>>(`/list/${listId}`, list);

export const handleDeleteProduct = (listId: string, productId: string) =>
  api.delete<any, AxiosResponse<EditListResponse>>(
    `/list/${listId}/remove-product/${productId}`
  );

export const handleDeleteList = (listId: string) =>
  api.delete<any, AxiosResponse<EditListResponse>>(`/list/${listId}`);
