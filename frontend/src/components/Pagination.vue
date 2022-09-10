<template>
  <nav>
    <ul class="pagination" :class="{ 'justify-content-center': centered }">
      <li class="page-item" :class="{ disabled: !paginator.previous }">
        <a class="page-link" href="#" @click.prevent="prevP"><span>&laquo;</span></a>
      </li>
      <li class="page-item active">
        <router-link class="page-link" to="#">{{ curPage }}</router-link>
      </li>
      <li class="page-item" :class="{ disabled: !paginator.next }">
        <a class="page-link" href="#" @click.prevent="nextP"><span>&raquo;</span></a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Paginator } from "@/api/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["prevPage", "nextPage"],
  props: {
    paginator: {
      type: Object as PropType<Paginator<unknown>>,
      required: true,
    },
    curPage: {
      type: Number,
      required: true,
    },
    centered: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    nextP() {
      this.$emit("nextPage");
    },
    prevP() {
      this.$emit("prevPage");
    },
  },
});
</script>

<style></style>
