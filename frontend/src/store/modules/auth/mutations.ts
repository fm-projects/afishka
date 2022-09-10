import { MutationTree } from "vuex";
import { AuthMutationTypes, AuthState, Mutations } from "./types";

export const mutations: MutationTree<AuthState> & Mutations = {
  [AuthMutationTypes.SET_TOKENS](state, tokens) {
    state.accessToken = tokens.accessToken;
    state.refreshToken = tokens.refreshToken;
  },

  [AuthMutationTypes.SET_USER](state, user) {
    state.user = user;
  },

  [AuthMutationTypes.CLEAR_TOKENS](state) {
    state.accessToken = null;
    state.refreshToken = null;
  },

  [AuthMutationTypes.CLEAR_USER](state) {
    state.user = null;
  },
};
