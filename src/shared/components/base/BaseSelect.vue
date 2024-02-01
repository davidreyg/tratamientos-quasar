<template>
  <q-select
    v-model="inputValue"
    :label="label"
    :error="!!errorMessage"
    bottom-slots
    :hide-bottom-space="!errorMessage"
    :options="options"
    outlined
    emit-value
    map-options
    @blur="handleBlur"
    @update:model-value="handleChange"
  >
    <template v-if="required" #label>
      {{ label }} <span class="text-red">*</span>
    </template>
    <template #error>
      {{ errorMessage }}
    </template>
    <template v-if="!!prefixIcon" #prepend>
      <q-icon :name="prefixIcon" />
    </template>
    <template #after>
      <slot name="after"></slot>
    </template>
  </q-select>
</template>
<script setup lang="ts">
import { QSelect } from 'quasar';
import { QSelectOptions } from 'shared/utils';
import { useField } from 'vee-validate';
import { toRef } from 'vue';
const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
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
  prefixIcon: {
    type: String,
    default: undefined,
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
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name);
</script>
