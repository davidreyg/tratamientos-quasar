<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
    <base-input
      name="nombres"
      label="Nombres"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      name="apellido_paterno"
      label="Apellido Paterno"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      name="apellido_materno"
      label="Apellido Materno"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-select
      :options="arr_tipo_documentos"
      name="tipo_documento_id"
      class="col-xs-12 col-sm-4"
      label="Tipo de Documento"
      :loading="false"
      required
    />
    <base-input
      name="numero_documento"
      label="N° de Documento"
      class="col-xs-12 col-sm-4"
      required
    />
    <div class="col-xs-12 col-sm-4">
      <base-date-picker
        required
        name="fecha_nacimiento"
        label="Fecha Nacimiento"
      />
    </div>
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
    <base-input name="edad" label="Edad" class="col-xs-12 col-sm-4" required />
    <base-input
      name="historia_clinica"
      label="Historia Clínica"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-radio
      required
      :options="[
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Femenino', value: 'Femenino' },
      ]"
      name="sexo"
      label="Sexo"
      class="col-xs-12 col-sm-8"
    />
  </base-form>
</template>

<script setup lang="ts">
import BaseDatePicker from 'shared/components/base/BaseDatePicker.vue';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseRadio from 'shared/components/base/BaseRadio.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { NotifyUtils } from 'shared/utils';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { number, object, string } from 'yup';
import {
  usePacienteCreateMutation,
  useTipoDocumentoFetchAllQuery,
} from '../composables';
import { PersonaRequest } from '../requests';

const emit = defineEmits<{
  (e: 'submit', numero_documento: number): void;
  (e: 'cancel'): void;
}>();

const { data: tipo_documentos } = useTipoDocumentoFetchAllQuery();

const arr_tipo_documentos = computed(() => {
  if (tipo_documentos.value) {
    return tipo_documentos.value.map((val) => {
      return {
        label: val.nombre,
        value: val.id,
      };
    });
  }
  return [];
});
const validationSchema = object().shape({
  nombres: string().trim().required().label('Nombres'),
  apellido_paterno: string().trim().required().label('Apellido Paterno'),
  apellido_materno: string().trim().required().label('Apellido Materno'),
  tipo_documento_id: number().required().label('Tipo de Documento'),
  numero_documento: number()
    .typeError('Debe ingresar un número')
    .required()
    .label('Número de Documento'),
  fecha_nacimiento: string().trim().required().label('Fecha de Nacimiento'),
  telefono: number()
    .typeError('Teléfono debe ser un numero')
    .test(
      'len',
      'Teléfono debe tener 9 dígitos',
      (val) => val?.toString().length === 9
    )
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
  historia_clinica: number()
    .typeError('Historia Clinica debe ser un numero')
    .integer()
    .positive()
    .required()
    .label('Historia Clinica'),
  sexo: string().required().label('Sexo'),
});
const { handleSubmit, setFieldValue, setErrors } = useForm<PersonaRequest>({
  validationSchema,
});

const { isLoading, mutate } = usePacienteCreateMutation();
setFieldValue('tipo_persona_id', 2);
const onSubmit = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: () => {
      NotifyUtils.success('Paciente registrado correctamente.');
      emit('submit', values.numero_documento);
    },
    onError: (err) => {
      setErrors(err.data.errors);
    },
  });
});
</script>

<style scoped></style>
