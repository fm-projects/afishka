<template>
  <div
    class="form-check"
    :class="{
      'form-check-inline': inline,
      'form-switch': type === 'switch',
    }"
  >
    <input
      class="form-check-input"
      :value="value"
      :checked="checked"
      :id="prefix + '_' + name"
      :autofocus="autofocus"
      :disabled="disabled"
      :name="name"
      :type="field_types[type]"
      :role="type"
    />
    <label class="form-check-label" v-if="label" :for="prefix + '_' + name">
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface CheckOption {
  value: string;
  label: string;
  checked?: boolean;
}

export type FieldType = keyof typeof field_types;

const field_types = {
  checkbox: "checkbox",
  radio: "radio",
  switch: "checkbox",
};

export default defineComponent({
  name: "Field",
  data() {
    return {
      field_types,
    };
  },
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: true,
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
    type: {
      type: String as PropType<FieldType>,
      required: false,
      default: "checkbox",
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
<style></style>
