<template>
  <div class="row">
    <base-form
      class="col-xs-12 col-sm-10"
      :loading="isLoading"
      @submit="onSubmit"
      @cancel="$emit('cancel')"
    >
      <base-input name="nombre" label="Nombre" class="col-12" />
      <div class="col-12"><q-separator spaced /> Examenes</div>
      <div class="col-12 row q-col-gutter-sm"><examen-card-list /></div>
    </base-form>
    <pre>{{ values }}</pre>
  </div>
</template>

<script setup lang="ts">
import { PaqueteRequest, usePaqueteCreateMutation } from 'core/paquete';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { array, number, object, string } from 'yup';
import ExamenCardList from '../cards/ExamenCardList.vue';
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  nombre: string().trim().min(2).required().label('Nombre'),
  examen_ids: array().of(number().required()).required().label('Examenes'),
});

const { handleSubmit, setErrors, values } = useForm<PaqueteRequest>({
  validationSchema,
  initialValues: {
    examen_ids: [],
  },
});

const { isLoading, mutate } = usePaqueteCreateMutation();

const onSubmit = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: () => {
      NotifyUtils.success();
      emit('submit');
    },
    onError: (err) => {
      setErrors(err.data.errors);
    },
  });
});
</script>
