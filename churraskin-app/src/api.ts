import axios, { AxiosResponse } from "axios";
import { GetListsResponse, LoginUserResponse } from "./types";

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

export const handleLoginAPI = (email: string, password: string) =>
  api.post<any, AxiosResponse<LoginUserResponse>>("/login", {
    email,
    password,
  });

export const handleGetLists = () =>
  api.get<any, AxiosResponse<GetListsResponse>>("/lists");

api.interceptors.request.use((config) => {
  const token = getToken();
  if (!config?.headers) {
    throw new Error("config not found");
  }

  config.headers["authorization"] = token;
  return config;
});
