<template>
  <div class="container mt-5 rt-wp mb-5">
    <h1 class="fs-2 fw-bold mb-4">Добавление мероприятия</h1>

    <div class="mb-3">
      <FormInput
        label="Название"
        v-model="data.name.value"
        :error="data.name.errorMessage"
        :isBound="isBound"
        :maxlength="100"
        name="name"
      ></FormInput>
    </div>

    <div class="mb-3">
      <label for="desc_id" class="form-label">Описание</label>
      <textarea
        name="desc"
        id="desc_id"
        cols="30"
        rows="10"
        class="form-control"
        v-model="data.description.value"
      ></textarea>
    </div>

    <div class="mb-3">
      <div class="mb-2">Начало мероприятия</div>
      <datepicker
        v-model="start_date"
        :position="'left'"
        locale="ru"
        class="w-100 mb-2"
        :select-text="'Выбрать'"
        :cancel-text="'Отмена'"
        :clearable="false"
      />
    </div>

    <div class="mb-3">
      <div class="mb-2">Конец мероприятия</div>
      <datepicker
        v-model="end_date"
        :position="'left'"
        locale="ru"
        class="w-100 mb-2"
        :select-text="'Выбрать'"
        :cancel-text="'Отмена'"
        :clearable="false"
      />
    </div>

    <div class="mb-3">
      <FormInput
        label="Цена"
        v-model="data.price.value"
        :error="data.price.errorMessage"
        :isBound="isBound"
        name="price"
        type="number"
      ></FormInput>
    </div>

    <div class="mb-3">
      <FormInput
        label="Максимальная цена"
        v-model="data.max_price.value"
        :error="data.max_price.errorMessage"
        :isBound="isBound"
        name="max_price"
        type="number"
      ></FormInput>
    </div>

    <div class="mb-3">
      <FormInput
        label="Количество участников"
        v-model="data.participants.value"
        :error="data.participants.errorMessage"
        :isBound="isBound"
        name=""
        type="number"
      ></FormInput>
    </div>

    <div class="mb-3">
      <FormInput
        label="Адрес"
        v-model="data.address.value"
        :error="data.address.errorMessage"
        :isBound="isBound"
        name="address"
      ></FormInput>
    </div>

    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="reg_needed"
          id="reg_needed"
        />
        <label class="form-check-label" for="reg_needed">
          Требуется регистрация
        </label>
      </div>
    </div>
    <!-- 
    <div class="mb-3">
      <FormInput
        label="Обложка"
        v-model="data.thumbnail.value"
        :error="data.thumbnail.errorMessage"
        :isBound="isBound"
        name="thumbnail"
        type="file"
      ></FormInput>
    </div> -->

    <button class="btn btn-outline-dark" @click="submit">Добавить</button>
  </div>
</template>

<script setup lang="ts">
import { createEvent, CreateEventData } from "@/api/services/events";
import { reactive, ref } from "vue";
import { FormInput } from "@/components";
import { FormBuilder, validateForm } from "@/utils/forms";
import { useStore } from "@/store";
import moment from "moment";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useRouter } from "vue-router";

const isBound = ref(false);
const store = useStore();
const router = useRouter();

const start_date = ref(moment().add(1, "day").toDate());
const end_date = ref(moment().add(1, "day").add(1, "hour").toDate());
const reg_needed = ref(false);

const data = reactive<FormBuilder>({
  name: {
    validators: ["required"],
    value: "",
  },
  price: {
    validators: ["required"],
    value: "0",
  },
  description: {
    value: "",
    validators: [],
  },
  max_price: {
    validators: [],
    value: "0",
  },
  participants: {
    validators: ["required"],
    value: "1",
  },
  address: {
    validators: [],
    value: "",
  },
  // thumbnail: {
  //   validators: [],
  //   value: "",
  // },
});

const submit = () => {
  const verdict = validateForm(data);
  if (!isBound.value) isBound.value = true;
  if (!verdict) return;

  const newEvent: CreateEventData = {
    creator: store.state.auth.user?.id as number,
    price: parseInt(data.price.value),
    max_price: parseInt(data.max_price.value),
    participants: parseInt(data.participants.value),
    address: data.address.value,
    reg_needed: reg_needed.value,
    start: start_date.value.toISOString(),
    end: start_date.value.toISOString(),
    description: data.description.value,
    name: data.name.value,
  };

  // if (data.thumbnail.value) {
  //   newEvent.thumbnail = data.thumbnail.value;
  // }

  createEvent(newEvent).then(() => {
    router.push("/");
  });
  // .catch((e: AxiosError) => {
  //   handleBackendError(e, {
  //     "400": {
  //       username: () => {
  //         data.username.errorMessage = "Имя пользователя уже занято";
  //       },
  //     },
  //   });
  // });
};
</script>
