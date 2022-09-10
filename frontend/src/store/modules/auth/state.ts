import { APIUser } from "@/api/services/auth";
import { getLocalData, LocalData } from "@/api/local";
import { AuthState } from "./types";

const getUser = (): APIUser | null => {
  const v = getLocalData(LocalData.USER);
  if (!v) return null;
  const vParsed: APIUser = JSON.parse(v);
  if (!vParsed) return null;
  return vParsed;
};

export const authState: AuthState = {
  accessToken: getLocalData(LocalData.ACCESS_TOKEN),
  refreshToken: getLocalData(LocalData.REFRESH_TOKEN),
  user: getUser(),
};
