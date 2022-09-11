<template>
  <Loading :is-loading="isLoading">
    <div v-if="obj" class="container rt-wp mt-4">
      <div class="alert alert-warning" v-if="!obj.accepted">
        <i class="bi-exclamation-circle me-2"></i>Данное событие ожидает
        подтверждения модератора
      </div>
      <div
        class="card"
        :style="
          obj.thumbnail
            ? `background-image: url(${obj.thumbnail}); background-size: cover; background-repeat: no-repeat; background-position: center center;`
            : gradients[obj.id % gradients.length][0]
        "
      >
        <div
          class="card-body position-relative d-flex align-items-center justify-content-center"
          :class="
            obj.thumbnail
              ? ['text-light']
              : [gradients[obj.id % gradients.length][1]]
          "
        >
          <h1
            class="card-name fw-bold fs-2"
            :class="obj.thumbnail ? ['badge bg-white text-dark'] : []"
          >
            {{ obj.name }}
          </h1>

          <div
            class="position-absolute top-0 end-0 pt-3 pe-3"
            v-if="store.getters.isAuthenticated"
          >
            <div id="star-btn" @click="changeStarredState">
              <svg
                v-if="!isStarred"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-star icon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-star-fill icon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                />
              </svg>
            </div>
          </div>

          <div
            class="position-absolute bottom-0 start-0 mb-2 ms-2 badge bg-light text-dark fs-5"
          >
            <div v-if="obj.price > 0">
              <span>{{ obj.price }}</span>
              <span v-if="obj.max_price && obj.max_price > obj.price">
                - {{ obj.max_price }}</span
              >&#8381;
            </div>
            <div v-else>бесплатно</div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col order-1 order-md-0 fs-5">
          <div class="">
            <div class="mb-3" v-if="obj.description">
              {{ obj.description }}
            </div>
            <div class="mb-1">
              <i class="bi bi-clock me-2"></i>
              {{ toShortDateTime(new Date(obj.start)) }}
            </div>
            <div v-if="obj.address" class="mb-1">
              <i class="bi-geo-alt me-2"></i>{{ obj.address }}
            </div>
            <div class="mb-1">
              <i class="bi bi-check me-2"></i
              >{{
                obj.reg_needed
                  ? "Требуется регистрация"
                  : "Регистрация не требуется"
              }}
            </div>
            <div v-if="obj.organizer" class="mb-1">
              <i class="bi-person me-2"></i>
              {{ obj.organizer }}
            </div>
            <div v-if="obj.organizer" class="mb-1">
              <i class="bi-people me-2"></i>
              {{
                plural(
                  obj.participants,
                  ["участник", "участника", "участников"],
                  true
                )
              }}
            </div>
          </div>
        </div>
        <div
          class="col-12 col-md-auto order-0 order-md-1 mb-2 mb-md-0"
          v-if="store.state.auth.user?.is_staff"
        >
          <div class="mb-2">
            <button
              class="btn btn-outline-danger w-100"
              @click="
                () => deleteEvent(String(obj?.id)).then(() => router.push('/'))
              "
            >
              <i class="bi-trash me-2"></i>Удалить
            </button>
          </div>

          <div class="mb-2">
            <a
              class="btn btn-outline-dark w-100"
              :href="`/admin/core/event/${obj.id}/change/`"
            >
              <i class="bi-pencil me-2"></i>Изменить
            </a>
          </div>
          <div class="mb-2">
            <button
              v-if="!obj.accepted"
              class="btn btn-outline-dark w-100"
              @click="markAsAccepted"
            >
              <i class="bi-check-lg me-2"></i>Опубликовать
            </button>
          </div>
        </div>
      </div>
    </div>
  </Loading>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getEvent,
  APIEvent,
  starEvent,
  deleteEvent,
  patchEvent,
} from "@/api/services/events";
import { useStore } from "@/store";
import { AuthActionTypes } from "@/store/modules/auth/types";
import { computed } from "vue";
import gradients from "./gradients";
import { Loading } from ".";
import { plural } from "@/utils/translation";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);

const obj = ref<APIEvent | null>(null);

const refresh = () => {
  const id = route.params.id;
  getEvent(id as string)
    .then((resp) => {
      obj.value = resp.data;
      isLoading.value = false;
    })
    .catch(() => router.push("/"));
};

onMounted(refresh);

const store = useStore();
const isStarred = computed(
  () =>
    store.state.auth.user &&
    obj.value &&
    store.state.auth.user.starred_events.includes(obj.value.id)
);

const changeStarredState = () => {
  if (!obj.value) return;
  starEvent(obj.value.id, !isStarred.value).then(() => {
    store.dispatch(AuthActionTypes.FETCH_CURRENT_USER);
  });
};

const markAsAccepted = () => {
  if (!obj.value) return;
  patchEvent(obj.value.id, { accepted: true }).then(refresh);
};

const toShortDateTime = (date: Date): string => {
  return date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });
};
</script>

<style scoped>
.card {
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
  border: 0;
  min-height: 200px;
}

#star-btn:hover {
  transform: scale(1.1);
}

#star-btn {
  transition: all 0.2s ease-in-out;
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
