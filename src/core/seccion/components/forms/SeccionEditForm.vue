<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-input name="nombre" label="Nombre" class="col-12" />
  </base-form>
</template>

<script setup lang="ts">
import {
  Seccion,
  SeccionRequest,
  useSeccionUpdateMutation,
} from 'core/seccion';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { useForm } from 'vee-validate';
import { PropType } from 'vue';
import { object, string } from 'yup';
const props = defineProps({
  seccion: {
    type: Object as PropType<Seccion>,
    required: true,
  },
});
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  nombre: string().trim().min(2).required().label('Nombre'),
});

const { handleSubmit, setErrors } = useForm<SeccionRequest>({
  validationSchema,
  initialValues: props.seccion,
});

const { isLoading, mutate } = useSeccionUpdateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(
    { data: values, id: props.seccion.id },
    {
      onSuccess: () => {
        emit('submit');
      },
      onError: (err) => {
        setErrors(err.data.errors);
      },
    }
  );
});
</script>
