<template>
  <label class="form-label" :for="prefix + '_' + name" v-if="label">
    {{ label }}
  </label>
  <div :class="{ 'input-group': isInputGroup || clearButton || password }">
    <input
      :type="inputType"
      class="form-control"
      :id="prefix + '_' + name"
      :name="name"
      :value="modelValue"
      :class="{
        'is-invalid': isBound && error.length,
        'is-valid': isBound && !error.length,
      }"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event)"
      @keyup="$emit('keyup', $event)"
      ref="inputRef"
    />

    <div v-if="isBound && error" class="invalid-feedback order-1">
      {{ error }}
    </div>

    <button v-if="clearButton" class="btn btn-outline-secondary" @click.prevent="clearValue">
      <i class="bi bi-x-lg"></i>
    </button>

    <button
      class="btn btn-outline-secondary"
      href="#"
      type="button"
      @click.prevent="showHidePassword"
      v-if="password"
    >
      <i
        :class="{
          'bi-eye': inputType === 'text',
          'bi-eye-slash': inputType === 'password',
        }"
      ></i>
    </button>

    <div class="form-text" v-if="help">
      {{ help }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Field",
  emits: ["update:modelValue", "change", "keyup"],
  setup(props, { emit }) {
    const clearValue = () => {
      emit("update:modelValue", "");
    };

    const inputType = ref(props.password ? "password" : props.type);
    const inputRef = ref<HTMLInputElement | null>(null);

    const showHidePassword = () => {
      inputType.value = inputType.value === "password" ? "text" : "password";
    };

    const getValue = () => {
      if (props.type === "file" && inputRef.value) {
        return inputRef.value.files;
      }
      return props.modelValue;
    };

    return {
      clearValue,
      showHidePassword,
      getValue,
      inputType,
    };
  },
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
    type: {
      type: String,
      required: false,
      default: "text",
    },
    error: {
      type: String,
      default: "",
    },
    isBound: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
    isInputGroup: {
      type: Boolean,
      default: false,
    },
    clearButton: {
      type: Boolean,
      default: false,
    },
    help: {
      type: String,
      default: "",
    },
    maxlength: {
      type: Number,
      default: undefined,
    },
    password: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style></style>
