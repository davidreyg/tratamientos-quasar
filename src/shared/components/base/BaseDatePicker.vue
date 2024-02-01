<template>
  <DatePicker
    v-model.string="inputValue"
    is-required
    :popover="popover"
    :masks="masks"
  >
    <template #default="{ inputValue: x, inputEvents, togglePopover }">
      <q-input
        :model-value="x"
        :label="label"
        outlined
        :error="!!errorMessage"
        bottom-slots
        :hide-bottom-space="!errorMessage"
        v-on="inputEvents"
      >
        <template #error>
          {{ errorMessage }}
        </template>
        <template v-if="required" #label>
          {{ label }} <span class="text-red">*</span>
        </template>
        <template #append>
          <q-icon
            name="fas fa-calendar-days"
            class="cursor-pointer"
            @click="togglePopover"
          />
        </template>
      </q-input>
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import { PopoverOptions } from 'v-calendar/dist/types/src/utils/popovers';
import 'v-calendar/style.css';
import { useField } from 'vee-validate';
import { ref, toRef } from 'vue';
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
const popover = ref<boolean | undefined | Partial<PopoverOptions>>({
  visibility: 'click',
  placement: 'top-end',
});
const masks = ref({
  modelValue: 'YYYY-MM-DD',
});
// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');
// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const { value: inputValue, errorMessage } = useField<string>(name);
</script>
