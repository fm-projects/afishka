import { store } from "./store";
import "vue-router";

declare module "@vue/runtime-core" {
  // Provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: typeof store;
  }
}

declare module "vuex" {
  export function useStore(key?: string): typeof store;
}

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    navbar?: {
      transparent?: boolean;
      expand?: boolean;
    };
  }
}
