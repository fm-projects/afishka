import { APIUser } from "@/api/services/auth";
import { ActionContext, CommitOptions, Store as VuexStore, DispatchOptions } from "vuex";
import { RootState } from "@/store";
import { APIKlassCompact } from "@/api/services/klasses";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: APIUser | null;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export enum AuthActionTypes {
  LOGIN = "AUTH/LOGIN",
  FETCH_CURRENT_USER = "AUTH/FETCH_CURRENT_USER",
  LOGOUT = "AUTH/LOGOUT",
}

export enum AuthMutationTypes {
  SET_TOKENS = "AUTH/SET_TOKENS",
  SET_USER = "AUTH/SET_USER",
  CLEAR_TOKENS = "AUTH/CLEAR_TOKENS",
  CLEAR_USER = "AUTH/CLEAR_USER",
}

export type Mutations<S = AuthState> = {
  [AuthMutationTypes.SET_USER](state: S, user: APIUser): void;
  [AuthMutationTypes.SET_TOKENS](
    state: S,
    tokens: { accessToken: string; refreshToken: string }
  ): void;
  [AuthMutationTypes.CLEAR_USER](state: S): void;
  [AuthMutationTypes.CLEAR_TOKENS](state: S): void;
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthState, RootState>, "commit">;

export interface Actions {
  [AuthActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    credentials: UserCredentials
  ): Promise<void>;

  [AuthActionTypes.LOGOUT]({ commit }: AugmentedActionContext): Promise<void>;

  [AuthActionTypes.FETCH_CURRENT_USER]({ commit }: AugmentedActionContext): Promise<void>;
}

export type Getters = {
  isAdmin: (state: AuthState) => boolean;
  isAuthenticated: (state: AuthState) => boolean;
  isStudent: (state: AuthState) => boolean;
  inKlass: (state: AuthState) => boolean;
  isMonitor: (state: AuthState) => boolean;
  klass: (state: AuthState) => APIKlassCompact | null;
};

export type AuthStore<S = AuthState> = Omit<VuexStore<S>, "getters" | "commit" | "dispatch"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
