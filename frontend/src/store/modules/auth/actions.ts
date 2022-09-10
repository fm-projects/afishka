import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { clearLocalData, LocalData, setLocalData } from "@/api/local";
import { getCurrentUser, login, logout } from "@/api/services/auth";
import { Actions, AuthActionTypes, AuthMutationTypes, AuthState } from "./types";

export const actions: ActionTree<AuthState, RootState> & Actions = {
  [AuthActionTypes.LOGIN]({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      login(credentials)
        .then((response) => {
          const { access, refresh } = response.data;
          setLocalData(LocalData.ACCESS_TOKEN, access);
          setLocalData(LocalData.REFRESH_TOKEN, refresh);
          commit(AuthMutationTypes.SET_TOKENS, {
            accessToken: access,
            refreshToken: refresh,
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  [AuthActionTypes.FETCH_CURRENT_USER]({ commit }) {
    return new Promise((resolve, reject) => {
      getCurrentUser()
        .then((response) => {
          commit(AuthMutationTypes.SET_USER, response.data);
          setLocalData(LocalData.USER, JSON.stringify(response.data));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [AuthActionTypes.LOGOUT]({ commit, state }) {
    return new Promise(() => {
      if (!state.refreshToken) {
        return Promise.reject("Refresh token is null.");
      }
      logout(state.refreshToken).finally(() => {
        commit(AuthMutationTypes.CLEAR_USER, undefined);
        commit(AuthMutationTypes.CLEAR_TOKENS, undefined);
        clearLocalData();
      });
    });
  },
};
