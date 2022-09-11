<template>
  <div class="container rt-wp mt-4">
    <div class="row justify-content-sm-center">
      <div class="col col-md-9 col-lg-6">
        <div class="card my-3">
          <div class="card-body" id="auth-form-app">
            <h2 class="card-title text-center">Регистрация</h2>
            <!-- <div class="d-flex flex-row align-items-center mb-3">
              <i class="bi bi-exclamation-circle-fill text-danger me-3"></i>
              <div>
                Пожалуйста, внимательно проверьте предоставленные данные перед завершением
                регистрации - для их последующего изменения потребуется время
              </div>
            </div> -->
            <div class="mb-3">
              <form-input
                name="username"
                label="Имя пользователя"
                v-model="data.username.value"
                :error="data.username.errorMessage"
                :isBound="isBound"
                :maxlength="100"
              ></form-input>
            </div>
            <div class="mb-3">
              <form-input
                name="password1"
                label="Пароль"
                v-model="data.password1.value"
                :error="data.password1.errorMessage"
                :isBound="isBound"
                :maxlength="100"
                password
              ></form-input>
            </div>
            <div class="mb-3">
              <form-input
                name="password2"
                label="Повторите пароль"
                v-model="data.password2.value"
                :error="data.password2.errorMessage"
                :isBound="isBound"
                :maxlength="100"
                password
              ></form-input>
            </div>

            <div class="text-center">
              <button
                type="submit"
                class="btn btn-outline-primary"
                @click.prevent="register"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormBuilder, handleBackendError, validateForm } from "@/utils/forms";
import { reactive, ref } from "vue";
import { FormInput } from "@/components";
import { CreateUserData, createUser } from "@/api/services/auth";
import { useRouter } from "vue-router";
import { AxiosError } from "axios";

const router = useRouter();

const data = reactive<FormBuilder>({
  username: {
    value: "",
    validators: ["required"],
  },
  password1: {
    value: "",
    validators: ["password1"],
  },
  password2: {
    value: "",
    validators: [],
    checkers: {
      password_match: {
        check: (value: string, state?: FormBuilder) =>
          Boolean(state && value === state.password1.value),
        errorMessage: "Пароли не совпадают",
      },
    },
  },
});
const isBound = ref(false);

const register = () => {
  const verdict = validateForm(data);
  if (!isBound.value) isBound.value = true;
  if (!verdict) return;

  const newStudent: CreateUserData = {
    username: data.username.value,
    password: data.password1.value,
  };

  createUser(newStudent)
    .then(() => {
      router.push("/login");
    })
    .catch((e: AxiosError) => {
      handleBackendError(e, {
        "400": {
          username: () => {
            data.username.errorMessage = "Имя пользователя уже занято";
          },
          password: (e) => {
            data.password1.errorMessage = e[0];
          },
        },
      });
    });
};
</script>

<style scoped>
#school-not-in-list > a {
  text-decoration: none;
  color: var(--bs-text-muted);
}
</style>
