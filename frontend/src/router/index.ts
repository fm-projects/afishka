import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Homepage from "../components/Homepage.vue";
import { handleMetaViews } from "./utils";
import { store } from "@/store";
import { ViewPermissions } from "./permissions";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Homepage,
    meta: {
      navbar: {
        transparent: true,
      },
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/denied",
    name: "denied",
    component: () => import("../components/PermissionDenied.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../components/Create.vue"),
  },
  {
    path: "/events/:id",
    component: () => import("../components/EventInfo.vue"),
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
    // console.log("collapsed");
  }

  const res = handleMetaViews(to, next);
  if (res) return;
  next();
});

export default router;
