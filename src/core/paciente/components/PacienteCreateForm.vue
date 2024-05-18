<template>
  <base-form :loading="isLoading" @submit="onSubmit" @cancel="$emit('cancel')">
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
    >
      <template #after>
        <q-btn
          v-if="isDniSelected"
          round
          dense
          icon="search"
          color="primary"
          :loading="reniecLoading"
          @click="searchReniec"
        >
          <q-tooltip> Buscar en RENIEC </q-tooltip>
        </q-btn>
      </template>
    </base-input>
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
    <base-input
      type="date"
      name="fecha_nacimiento"
      label="Fecha Nacimiento"
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
import { useTipoDocumentoFetchAllQuery } from 'core/tipo-documento';
import { DateTime } from 'luxon';
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseRadio from 'shared/components/base/BaseRadio.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import { usePersonaReniecQuery } from 'shared/composables';
import { NotifyUtils, useLuxonFormat } from 'shared/utils';
import { useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { number, object, string } from 'yup';
import { usePacienteCreateMutation } from '../composables';
import { PacienteRequest } from '../requests';

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

const isDniSelected = computed(() => {
  const selected = arr_tipo_documentos.value.find(
    (v) => v.value == Number(values.tipo_documento_id)
  );
  if (selected) {
    return selected.label === 'DNI' ? true : false;
  }
  return false;
});

const validationSchema = object().shape({
  nombres: string().trim().required().label('Nombres'),
  apellido_paterno: string().trim().required().label('Apellido Paterno'),
  apellido_materno: string().trim().required().label('Apellido Materno'),
  direccion: string().trim().required().label('Direccion'),
  tipo_documento_id: string().required().label('Tipo de Documento'),
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
  historia_clinica: string().required().label('Historia Clinica'),
  sexo: string().required().label('Sexo'),
});
const { handleSubmit, setFieldValue, setErrors, values, resetForm } =
  useForm<PacienteRequest>({
    validationSchema,
  });

const { isLoading, mutateAsync } = usePacienteCreateMutation();
const onSubmit = handleSubmit(async (values) => {
  await mutateAsync(values, {
    onSuccess: () => {
      NotifyUtils.success('Paciente registrado correctamente.');
      emit('submit', values.numero_documento);
    },
    onError: (err) => {
      setErrors(err.data.errors);
    },
  });
});

const { fetch, reniec, isLoading: reniecLoading } = usePersonaReniecQuery();
const searchReniec = async () => {
  await fetch(values.numero_documento);
  if (reniec.value) {
    setFieldValue('nombres', reniec.value.nombres);
    setFieldValue('apellido_paterno', reniec.value.apellido_paterno);
    setFieldValue('apellido_materno', reniec.value.apellido_materno);
    setFieldValue('direccion', reniec.value.direccion);
    setFieldValue('sexo', reniec.value.sexo === '1' ? 'Masculino' : 'Femenino');
    var formattedDate = reniec.value.fecha_nacimiento.split('/');
    const n = DateTime.local(
      Number(formattedDate[2]),
      Number(formattedDate[1]),
      Number(formattedDate[0])
    );
    if (n.isValid) {
      setFieldValue('fecha_nacimiento', n.toISODate());
    }
  } else {
    resetForm();
  }
};
//Calcular edad a partir de la fecha de nacimiento
const { calcularEdad } = useLuxonFormat();
watch(
  () => values.fecha_nacimiento,
  (fecha) => {
    if (fecha) {
      setFieldValue('edad', calcularEdad(fecha as string));
    }
  }
);
</script>

<style scoped></style>
