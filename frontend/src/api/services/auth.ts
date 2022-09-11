import API from "@/api";
import { AxiosResponse } from "axios";

export interface APITokens {
  access: string;
  refresh: string;
}

export enum AuthAPIURLS {
  GET_TOKEN = "auth/jwt/create/",
  REMOVE_TOKEN = "auth/jwt/blacklist/",
  REFRESH_TOKEN = "auth/jwt/refresh/",
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface CreateUserData {
  username: string;
  password: string;
}

export interface APIUser {
  username: string;
  id: number;
  starred_events: number[];
  is_staff: boolean;
}

export const getCurrentUser = (): Promise<AxiosResponse<APIUser>> => {
  return API.axios.get<APIUser>("auth/users/me/");
};

export const createUser = (
  data: CreateUserData
): Promise<AxiosResponse<APIUser>> => {
  return API.noAuthAxios.post("auth/users/", data);
};

export const login = (
  credentials: UserCredentials
): Promise<AxiosResponse<APITokens>> => {
  return API.noAuthAxios.post(AuthAPIURLS.GET_TOKEN, {
    username: credentials.username,
    password: credentials.password,
  });
};

export const logout = (refreshToken: string): Promise<AxiosResponse> => {
  return API.axios.post(AuthAPIURLS.REMOVE_TOKEN, {
    refresh: refreshToken,
  });
};
