<script setup lang="ts">
import { onMounted } from "vue";
import MainNavbar from "./components/MainNavbar.vue";
import { useStore } from "./store";
import { AuthActionTypes } from "./store/modules/auth/types";

const store = useStore();

onMounted(() => {
  if (store.state.auth.user) store.dispatch(AuthActionTypes.FETCH_CURRENT_USER);
});
</script>

<template>
  <main-navbar />
  <div class="view-wrapper">
    <router-view />
  </div>
</template>

<style scoped></style>
