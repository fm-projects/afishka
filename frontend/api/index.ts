import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getLocalData, LocalData, setLocalData } from "./local";
import router from "@/router";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { store } from "@/store";
import { AuthActionTypes } from "@/store/modules/auth/types";

const BASE_URL = "/api/";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

enum APIURLS {
  REFRESH_TOKEN = "auth/jwt/refresh/",
}

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "ru-RU",
  },
});

export const noAuthInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "ru-RU",
  },
});

// Add a request interceptor to set authetication token
// before sending request
instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const token = getLocalData(LocalData.ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthLogic = (failedRequest: AxiosError) =>
  axios
    .post(BASE_URL + APIURLS.REFRESH_TOKEN, {
      refresh: getLocalData(LocalData.REFRESH_TOKEN),
    })
    .then((response) => {
      setLocalData(LocalData.ACCESS_TOKEN, response.data.access);
      if (failedRequest.response?.config.headers) {
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + response.data.access;
      }
      return Promise.resolve();
    })
    .catch((error) => {
      store.dispatch(AuthActionTypes.LOGOUT).finally(() => {
        router.push("/login");
        return Promise.reject(error);
      });
    });

createAuthRefreshInterceptor(instance, refreshAuthLogic);

export type APIServiceType = APIService;

export class APIService {
  public readonly axios: AxiosInstance = instance;
  public readonly noAuthAxios: AxiosInstance = noAuthInstance;
}

const API = new APIService();
export default API;
