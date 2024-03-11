<template>
  <q-field
    color="black"
    borderless
    :error="!!errorMessage"
    bottom-slots
    :hide-bottom-space="!errorMessage"
  >
    <q-option-group
      v-model="value"
      :options="options"
      type="checkbox"
      v-bind="$attrs"
      @update:model-value="
        (e) => {
          handleChange(e);
          $emit('update', e);
        }
      "
    />
    <template #error>
      {{ errorMessage }}
    </template>
  </q-field>
</template>

<script setup lang="ts">
import { QSelectOptions } from 'shared/utils';
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
  options: {
    type: Array<QSelectOptions>,
    required: true,
  },
});

defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'update', value: any): void;
}>();
// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');
const { value, handleChange, errorMessage } = useField<(string | number)[]>(
  name,
  undefined
  // { initialValue: [] }
);
</script>

<style scoped></style>
