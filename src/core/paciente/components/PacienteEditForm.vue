<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-input
      :outlined="false"
      :borderless="true"
      readonly
      name="nombres"
      label="Nombres"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      :outlined="false"
      :borderless="true"
      readonly
      name="apellido_paterno"
      label="Apellido Paterno"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      :outlined="false"
      :borderless="true"
      readonly
      name="apellido_materno"
      label="Apellido Materno"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      :outlined="false"
      :borderless="true"
      readonly
      name="tipo_documento"
      class="col-xs-12 col-sm-4"
      label="Tipo de Documento"
      :loading="false"
      required
    />
    <base-input
      :outlined="false"
      :borderless="true"
      readonly
      name="numero_documento"
      label="N° de Documento"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      :outlined="false"
      :borderless="true"
      readonly
      name="fecha_nacimiento"
      label="Fecha de Nacimiento"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      name="direccion"
      label="Dirección"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      name="telefono"
      label="Teléfono"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      :outlined="false"
      :borderless="true"
      readonly
      name="edad"
      label="Edad"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      name="historia_clinica"
      label="Historia Clínica"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      :outlined="false"
      :borderless="true"
      readonly
      name="sexo"
      label="Sexo"
      class="col-xs-12 col-sm-4"
      required
    />
  </base-form>
</template>

<script setup lang="ts">
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { PropType } from 'vue';
import { number, object, string } from 'yup';
import { usePacienteUpdateMutation } from '../composables';
import { Paciente } from '../models';
import { PacienteRequest } from '../requests';
const props = defineProps({
  paciente: {
    type: Object as PropType<Paciente>,
    required: true,
  },
});

defineEmits<{
  // (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const validationSchema = object().shape({
  nombres: string().trim().required().label('Nombres'),
  apellido_paterno: string().trim().required().label('Apellido Paterno'),
  apellido_materno: string().trim().required().label('Apellido Materno'),
  tipo_documento_id: number().required().label('Tipo de Documento'),
  direccion: string().trim().required().label('Direccion'),
  numero_documento: number()
    .typeError('Debe ingresar un número')
    .required()
    .label('Número de Documento'),
  fecha_nacimiento: string().trim().required().label('Fecha de Nacimiento'),
  telefono: number()
    .typeError('Teléfono debe ser un numero')
    .integer()
    .positive()
    .required()
    .label('Teléfono'),
  edad: number()
    .typeError('Edad debe ser un numero')
    .integer()
    .positive()
    .required()
    .label('Edad'),
  historia_clinica: string().trim().required().label('Historia Clinica'),
  sexo: string().required().label('Sexo'),
});
const { handleSubmit, setErrors } = useForm<PacienteRequest>({
  validationSchema,
  initialValues: props.paciente,
});

const { isLoading, mutate } = usePacienteUpdateMutation();
const onSubmit = handleSubmit(async (values) => {
  // Seteamos tipo paciente a Paciente
  mutate(
    { data: values, id: props.paciente.id },
    {
      onSuccess: () => {
        NotifyUtils.success();
        // emit('submit');
      },
      onError: (err) => {
        setErrors(err.data.errors);
      },
    }
  );
});
</script>

<style scoped></style>
