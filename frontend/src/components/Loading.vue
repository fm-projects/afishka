<template>
  <div v-if="isLoading" class="text-center">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style></style>
