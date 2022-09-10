import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { AuthState, Getters } from "./types";

export const getters: GetterTree<AuthState, RootState> & Getters = {
  isAuthenticated: (state) => Boolean(state.accessToken && state.refreshToken && state.user),
  isStudent: (state) => Boolean(state.user && state.user.account_type === 3),
  isAdmin: (state) => Boolean(state.user && state.user.account_type <= 1),
  inKlass: (state) => Boolean(state.user && state.user.options_student?.klass),
  klass: (state) => {
    if (state.user && state.user.options_student) return state.user.options_student.klass;
    return null;
  },
  isMonitor: (state) => Boolean(state.user && state.user.options_student?.is_monitor),
};
