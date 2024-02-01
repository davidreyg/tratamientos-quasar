<template>
  <q-input
    v-model="inputValue"
    :type="computedType"
    :label="label"
    :error="!!errorMessage"
    bottom-slots
    :hide-bottom-space="!errorMessage"
    outlined
    @blur="handleBlur"
    @update:model-value="handleChange"
  >
    <template #error>
      {{ errorMessage }}
    </template>
    <template v-if="required" #label>
      {{ label }} <span class="text-red">*</span>
    </template>
    <template v-if="!!prefixIcon" #prepend>
      <q-icon :name="prefixIcon" />
    </template>
    <template v-if="type === 'password'" #append>
      <q-icon
        :name="togglePassword ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="togglePassword = !togglePassword"
      />
    </template>
    <template #after>
      <slot name="after"></slot>
    </template>
  </q-input>
</template>
<script setup lang="ts">
import { QInputProps } from 'quasar';
import { useField } from 'vee-validate';
import { PropType, computed, ref, toRef } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<QInputProps['type']>,
    required: false,
    default: 'text',
  },
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
  prefixIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
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
const computedType = computed(() => {
  if (props.type === 'password') {
    return togglePassword.value ? 'text' : 'password';
  }
  return props.type;
});
const togglePassword = ref(false);
// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>
