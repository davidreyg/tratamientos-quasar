<template>
  <div class="row">
    <base-form
      class="col-xs-12 col-sm-10"
      :loading="isLoading"
      @submit="onSubmit"
      @cancel="$emit('cancel')"
    >
      <base-input name="nombre" label="Nombre" class="col-12" />
      <base-input name="codigo" label="Codigo" class="col-6" />
      <base-input name="telefono" label="Telefono" class="col-6" />
      <base-input name="direccion" label="Direccion" class="col-12" />
      <base-input name="ris" label="RIS" class="col-6" />
      <base-check-box
        name="has_lab"
        label="¿Tiene Laboratorio?"
        class="col-6"
      />
    </base-form>
  </div>
</template>

<script setup lang="ts">
import {
  EstablecimientoRequest,
  useEstablecimientoCreateMutation,
} from 'core/establecimiento';
import BaseCheckBox from 'shared/components/base/BaseCheckBox.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { boolean, number, object, string } from 'yup';
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
const validationSchema = object().shape({
  nombre: string().trim().min(2).required().label('Nombre'),
  codigo: number()
    .typeError('Codigo debe ser un numero')
    .integer()
    .positive()
    .required()
    .label('Codigo'),
  direccion: string().trim().min(2).max(60).required().label('Direccion'),
  telefono: number()
    .typeError('Teléfono debe ser un numero')
    .integer()
    .positive()
    .nullable()
    .label('Telefono'),
  ris: string().trim().min(2).max(60).required().label('RIS'),
  has_lab: boolean().required().label('¿Laboratorio?'),
});

const { handleSubmit, setErrors } = useForm<EstablecimientoRequest>({
  validationSchema,
});

const { isLoading, mutate } = useEstablecimientoCreateMutation();

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
