import { store } from "@/store";

export enum ViewPermissions {
  ADMIN = 1,
}

export const checkViewPermissions = (permissions: number | undefined) => {
  if (!permissions) return true; // Permissions aren't specified

  // If user isn't authenticated, there's no need for checks
  if (!store.state.auth.user) return false;

  if (permissions & ViewPermissions.ADMIN) {
    if (store.getters.isAdmin) return true;
  }

  return false;
};
