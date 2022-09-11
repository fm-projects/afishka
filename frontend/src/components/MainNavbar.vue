<template>
  <nav
    class="navbar navbar-light w-100 fixed-top navbar-expand-sm"
    id="main-navbar"
    :class="{
      scrolled: isScrolled,
    }"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand d-block">
        <img
          :src="logo"
          id="logo"
          class="d-inline-block align-center me-2"
          alt=""
        />
        <!-- <span id="brand-name"></span> -->
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        id="mainNavbarToggler"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="mainNavbarContent"
        ref="navbarContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

        <div
          v-if="!user && !(route.name === 'login' || route.name === 'register')"
        >
          <li class="d-flex">
            <ul class="navbar-nav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link to="/login" class="me-2 nav-link"
                    >Войти</router-link
                  >
                </li>
              </ul>
              <li class="nav-item">
                <router-link
                  to="/register"
                  class="me-2 btn btn-outline-primary"
                >
                  Создать аккаунт</router-link
                >
              </li>
            </ul>
          </li>
        </div>

        <div v-if="user" class="dropdown d-flex">
          <div
            class="d-flex dropdown-toggle align-items-center position-relative"
            data-bs-toggle="dropdown"
            id="mainNavbarDropdown"
          >
            <div class="navbar-text me-3 fw-bold">
              {{ user.username }}
            </div>
            <svg v-html="jdenticon" id="avatar"></svg>
          </div>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <router-link class="dropdown-item" to="/create">
                <i class="bi bi-calendar-plus me-2"></i
                ><span>Добавить мероприятие</span>
              </router-link>
            </li>
            <!-- <li>
              <router-link class="dropdown-item" to="/settings">
                <i class="bi bi-gear me-2"></i><span>Настройки</span>
              </router-link>
            </li> -->
            <li>
              <a class="dropdown-item" href="#" @click.prevent="logout">
                <i class="bi bi-box-arrow-right me-2"></i>
                <span>Выйти из аккаунта</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "@/store";
import router from "@/router";
import { useRoute } from "vue-router";
import logo from "@/assets/icons/icon.svg";
import { toSvg } from "jdenticon";
import { AuthActionTypes } from "@/store/modules/auth/types";

const store = useStore();
const route = useRoute();

const user = computed(() => store.state.auth.user);
const jdenticon = computed(() => toSvg(user.value?.id, 45));

const isScrolled = ref(false);

const logout = () => {
  store.dispatch(AuthActionTypes.LOGOUT);
  router.push("/");
};

const onScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
#main-navbar {
  transition: background-color 0.2s ease-in-out;
  background-color: #ffffff;
}

#logo {
  height: 30px;
}

#brand-name {
  font-weight: 600;
  font-family: "Google Sans";
}

#main-navbar.scrolled {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out;
}

#main-navbar #avatar {
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 10%;
}

/* #main-navbar #avatar {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
  } */

#mainNavbarDropdown::after {
  content: none;
}

#notification-count-badge {
  padding: 0.45em;
  top: calc(-0.45em + 2px);
  right: calc(-0.45em + 2px);
  animation: notification-pulse 3s infinite;
}

@keyframes notification-pulse {
  0% {
    transform: scale(0.91);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.91);
  }
}
</style>
