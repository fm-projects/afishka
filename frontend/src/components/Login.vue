<template>
  <div class="container mt-4 rt-wp">
    <div class="row justify-content-sm-center">
      <div class="col col-md-9 col-lg-6">
        <div class="card card-body login my-3">
          <h2 class="card-title text-center">Вход</h2>

          <form @submit.prevent="processLogin">
            <div class="mb-3">
              <form-input
                type="text"
                name="username"
                label="Имя пользователя"
                v-model="credentials.username.value"
                :error="credentials.username.errorMessage"
                :isBound="credentials.username.isBound"
              />
            </div>
            <div class="mb-3">
              <form-input
                name="password"
                label="Пароль"
                v-model="credentials.password.value"
                password
                :error="credentials.password.errorMessage"
                :isBound="credentials.password.isBound"
              />
            </div>

            <div>
              <button type="submit" class="btn btn-outline-dark w-100">
                Войти
              </button>
            </div>

            <div class="text-center mt-3">
              <div>
                Ещё не зарегистрировались?
                <router-link to="/register"> Создайте аккаунт</router-link>
              </div>
              <div class="mt-2">
                <a href="{% url 'reset_password' %}">Забыли пароль?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormBuilder, validateForm, Validator } from "@/utils/forms";
import { ref } from "vue";
import { AxiosError } from "axios";
import router from "@/router";
import { FormInput } from "@/components";
import { useStore } from "@/store";
import { AuthActionTypes, UserCredentials } from "@/store/modules/auth/types";

const authError = ref<AxiosError | null>(null);
const store = useStore();

const authChecker: Validator = {
  check: () => {
    return authError.value === null;
  },
  errorMessage: "Неверный логин или пароль",
};

const credentials = ref<FormBuilder>({
  username: {
    value: "",
    validators: ["required"],
    checkers: {
      authChecker,
    },
    isBound: false,
  },
  password: {
    value: "",
    validators: ["required"],
  },
});

const processLogin = (): void => {
  authError.value = null;
  const verdict = validateForm(credentials.value);

  if (!verdict) {
    return;
  }

  const data: UserCredentials = {
    username: credentials.value.username.value,
    password: credentials.value.password.value,
  };

  store
    .dispatch(AuthActionTypes.LOGIN, data)
    .then(() => {
      store.dispatch(AuthActionTypes.FETCH_CURRENT_USER).then(() => {
        router.push("/");
      });
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        authError.value = error;
        validateForm(credentials.value);
        if (
          authError.value !== null &&
          !credentials.value.password.errorMessage
        ) {
          credentials.value.password.isBound = false;
        }
      }
    });
};
</script>

<style></style>
