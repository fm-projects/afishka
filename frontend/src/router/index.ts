import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/homepage/Home.vue";
import { handleMetaViews } from "./utils";
import { store } from "@/store";
import { ViewPermissions } from "./permissions";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      navbar: {
        transparent: true,
      },
    },
  },
  {
    path: "/denied",
    name: "denied",
    component: () => import("../components/PermissionMissing.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.body.setAttribute("tabindex", "-1");
  document.body.focus();
  document.body.removeAttribute("tabindex");

  const btn = document.getElementById("mainNavbarToggler");
  if (btn && !btn.classList.contains("collapsed")) {
    const content = document.getElementById("mainNavbarContent");
    content!.classList.remove("show");
    btn.classList.add("collapsed");
    console.log("collapsed");
  }

  const res = handleMetaViews(to, next);
  if (res) return;
  next();
});

export default router;
