import { createLogger, createStore, Plugin } from "vuex";
import VuexPersistence from "vuex-persist";
import { auth } from "./modules/auth";
import { AuthStore, AuthState } from "./modules/auth/types";

export type Store = AuthStore<Pick<RootState, "auth">>;

export type RootState = {
  auth: AuthState;
};

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: [],
});

const debug = process.env.NODE_ENV !== "production";
const plugins: Plugin<RootState>[] = debug ? [createLogger<RootState>({})] : [];

plugins.push(vuexLocal.plugin);

export const store = createStore({
  modules: {
    auth,
  },
  plugins,
  strict: false,
});

export function useStore(): Store {
  return store as Store;
}
