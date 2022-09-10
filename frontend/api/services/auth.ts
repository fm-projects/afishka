import API from "@/api";
import { AxiosResponse } from "axios";

export interface APITokens {
  access: string;
  refresh: string;
}

export enum AuthAPIURLS {
  CURRENT_USER = "auth/users/me",
  GET_TOKEN = "auth/jwt/create/",
  REMOVE_TOKEN = "auth/jwt/blacklist/",
  REFRESH_TOKEN = "auth/jwt/refresh/",
}

export interface APIUser {}

export const getCurrentUser = (): Promise<AxiosResponse<APIUser>> => {
  return API.axios.get<APIUser>(AuthAPIURLS.CURRENT_USER);
};

export const login = (
  credentials: UserCredentials
): Promise<AxiosResponse<APITokens>> => {
  return API.noAuthAxios.post(AuthAPIURLS.GET_TOKEN, {
    email: credentials.email,
    password: credentials.password,
  });
};

export const logout = (refreshToken: string): Promise<AxiosResponse> => {
  return API.axios.post(AuthAPIURLS.REMOVE_TOKEN, {
    refresh: refreshToken,
  });
};
