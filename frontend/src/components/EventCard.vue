<template>
  <div class="card" :style="gradient[0]">
    <img
      v-if="obj.thumbnail"
      :src="obj.thumbnail"
      alt=""
      class="card-img-top"
    />
    <div
      class="card-body position-relative d-flex align-items-center justify-content-center"
      :class="[gradient[1]]"
    >
      <div class="card-name fw-bold fs-5">
        {{ obj.name }}
      </div>

      <div class="position-absolute top-0 end-0 pt-2 pe-2" v-if="store.getters.isAuthenticated">
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
        class="position-absolute bottom-0 start-0 mb-2 ms-2 badge bg-light text-dark"
      >
        <span v-if="obj.price">{{ obj.price }}&#8381;</span>
        <span v-else>бесплатно</span>
      </div>
    </div>
  </div>
  <div class="p-2">
    <div>{{ toShortDateTime(new Date(obj.start)) }}</div>
    <div v-if="obj.verbose_address">{{ obj.verbose_address }}</div>
  </div>
</template>
<script lang="ts" setup>
import { APIEvent, starEvent } from "@/api/services/events";
import { useStore } from "@/store";
import { AuthActionTypes } from "@/store/modules/auth/types";
import { computed } from "vue";

const store = useStore();
const isStarred = computed(
  () =>
    store.state.auth.user &&
    store.state.auth.user.starred_events.includes(props.obj.id)
);

interface Props {
  obj: APIEvent;
  gradient: [string, string]
}

const changeStarredState = () => {
  starEvent(props.obj.id, !isStarred.value).then(() => {
    store.dispatch(AuthActionTypes.FETCH_CURRENT_USER);
  });
};

const toShortDateTime = (date: Date): string => {
  return date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });
};

const props = defineProps<Props>();
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
