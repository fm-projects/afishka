<template>
  <div class="form-input-wrapper">
    <label :for="prefix + '_' + name" v-if="label" class="form-label">{{ label }}</label>
    <select
      :name="name"
      :id="prefix + '_' + name"
      :multiple="multiple"
      :disabled="disabled"
      :autofocus="autofocus"
      class="form-select"
      :class="{
        'is-invalid': isBound && error.length,
        'is-valid': isBound && !error.length,
      }"
      @change="
        $emit('update:modelValue', $event.target.value);
        $emit('change', $event.target.value);
      "
    >
      <option v-if="placeholder" hidden disabled selected value="">
        {{ placeholder }}
      </option>
      <option
        :value="option.value ? option.value : index"
        :selected="option.selected"
        v-for="(option, index) in options"
        :key="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <div v-if="isBound && error" class="invalid-feedback order-1">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

export default defineComponent({
  name: "Field",
  emits: ["update:modelValue", "change"],
  props: {
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: false,
      default: "id",
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    isBound: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style></style>
