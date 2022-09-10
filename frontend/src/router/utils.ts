import { store } from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { checkViewPermissions } from "./permissions";

export const handleMetaViews = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext
): boolean => {
  if (to.matched.some((record) => record.meta.requiresAuth !== undefined)) {
    if (to.meta.requiresAuth) {
      if (!store.getters.isAuthenticated) {
        next({ name: "login" });
        return true;
      }
    } else {
      if (store.getters.isAuthenticated) {
        next({ name: "home" });
        return true;
      }
    }
  }

  if (!checkViewPermissions(to.meta.permissions)) {
    next({ name: "denied" });
    return true;
  }

  return false;
};
