<template>
  <base-form @submit="onSubmit">
    <base-input
      v-for="(field, idx) in fields.filter((field) => field.type !== 'array')"
      :key="idx"
      :name="field.name"
      :label="field.label"
      :suffix="field.suffix"
      :stack-label="true"
      class="col-xs-12 col-sm-4"
    />
    <div
      v-for="(field, idx) in fields.filter((field) => field.type === 'array')"
      :key="idx"
      class="col-12 row q-col-gutter-md"
    >
      <base-input
        v-for="(item, idxx) in field.fields"
        :key="idxx"
        :name="`signos[${idxx}].valor`"
        :label="item.label"
        :suffix="item.suffix"
        :stack-label="true"
        class="col-xs-12 col-sm-4"
      />
    </div>
  </base-form>
</template>

<script setup lang="ts">
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { Field } from 'shared/utils';
import { useForm } from 'vee-validate';
defineEmits<{
  (e: 'submit'): void;
}>();
const props = defineProps({
  fields: {
    type: Array<Field>,
    required: true,
  },
  initialValues: {
    type: Object,
    required: false,
    default: undefined,
  },
  validationSchema: {
    type: Object,
    required: true,
  },
});
const { handleSubmit, values } = useForm({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
});

const onSubmit = handleSubmit(
  async (values) => {
    console.log(values);
  },
  (values) => {
    console.log(values);
  }
);
</script>
