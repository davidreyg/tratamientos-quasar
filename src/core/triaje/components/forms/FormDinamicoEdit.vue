<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="onCancel">
    <base-input
      v-for="(field, idx) in fields.filter((field) => field.type !== 'array')"
      :key="idx"
      :name="field.name"
      :label="field.label"
      :suffix="field.suffix"
      :type="(field.type as any)"
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
        :name="`pivot[${idxx}].valor`"
        :label="item.label"
        :suffix="item.suffix"
        :stack-label="true"
        class="col-xs-12 col-sm-4"
      />
    </div>
  </base-form>
</template>

<script setup lang="ts">
import { useTriajeUpdateMutation } from 'core/triaje/composables';
import { TriajeCreateRequest } from 'core/triaje/requests';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { Field, NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
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
  triajeId: {
    type: Number,
    required: true,
  },
});
const { handleSubmit, setErrors, resetForm } = useForm<TriajeCreateRequest>({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
});
const { mutateAsync, reset, isLoading } = useTriajeUpdateMutation();
const onSubmit = handleSubmit(async (values) => {
  await mutateAsync(
    { data: values, id: props.triajeId },
    {
      onSuccess: () => {
        NotifyUtils.success();
        emit('submit');
      },
      onError: (err) => {
        reset.value();
        setErrors(err.data.errors);
      },
    }
  );
});

const onCancel = () => {
  resetForm();

  emit('cancel');
};
</script>
