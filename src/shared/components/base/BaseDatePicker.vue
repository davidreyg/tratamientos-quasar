<template>
  <VueDatePicker
    v-model.string="inputValue"
    text-input
    locale="es"
    model-type="yyyy-MM-dd"
    auto-apply
    format="dd/MM/yyyy"
    :teleport-center="true"
  >
    <template #dp-input="{ value: v, onInput, onBlur }">
      <q-input
        class="q-ma-none q-pa-none"
        type="text"
        :model-value="v"
        :label="label"
        outlined
        :error="!!errorMessage"
        bottom-slots
        dense
        @input="onInput"
        @blur="onBlur"
      >
        <template #error>
          {{ errorMessage }}
        </template>
        <template v-if="required" #label>
          {{ label }} <span class="text-red">*</span>
        </template>
      </q-input>
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import 'v-calendar/style.css';
import { useField } from 'vee-validate';
import { toRef } from 'vue';
const props = defineProps({
  value: {
    type: [String, Number],
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');
// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const { value: inputValue, errorMessage } = useField<string | Date>(
  name,
  undefined
  // { initialValue: new Date() }
);
</script>
