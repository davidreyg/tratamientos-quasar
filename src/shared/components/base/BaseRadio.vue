<template>
  <q-option-group
    v-model="inputValue"
    type="radio"
    :options="options"
    inline
    :name="name"
  >
  </q-option-group>
</template>

<script setup lang="ts">
import { QSelectOptions } from 'shared/utils';
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = defineProps({
  options: {
    type: Array<QSelectOptions>,
    required: true,
  },
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

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  // errorMessage,
  // handleBlur,
  // handleChange,
} = useField<string | number | boolean | Date>(name, undefined, {
  type: 'radio',
  initialValue: props.options[0].value,
});
</script>

<style scoped></style>
