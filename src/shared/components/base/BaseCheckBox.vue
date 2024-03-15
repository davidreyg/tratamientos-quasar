<template>
  <q-field
    color="black"
    borderless
    :error="!!errorMessage"
    bottom-slots
    :hide-bottom-space="!errorMessage"
  >
    <q-checkbox
      v-bind="$attrs"
      v-model="value"
      :label="label"
      @update:model-value="(e) => handleChange(e)"
    />
    <slot></slot>
    <template #error>
      {{ errorMessage }}
    </template>
  </q-field>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');
const { value, handleChange, errorMessage } = useField(name);
</script>

<style scoped></style>
