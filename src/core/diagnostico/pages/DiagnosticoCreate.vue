<template>
  <div class="row q-col-gutter-md">
    <q-form
      class="col-12 row q-col-gutter-lg items-start justify-center"
      @submit="onSubmit"
    >
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
      <q-card-actions class="col-auto justify-center">
        <q-btn
          color="primary"
          outline
          size="lg"
          icon="search"
          label="Buscar"
          no-caps
          type="submit"
          :loading="isPacienteLoading"
        />
      </q-card-actions>
    </q-form>
    <div class="col-12">
      <q-expansion-item
        icon="fas fa-person"
        label="Datos del Paciente"
        caption="Editar / Crear"
        class="bg-purple-2"
      >
        <datos-paciente-tab
          class="bg-purple-1"
          :paciente="paciente"
          @cancel="$reset"
          @submit="fetchPaciente(values.numero_documento)"
        />
      </q-expansion-item>
      <q-expansion-item
        v-if="paciente"
        icon="fas fa-stethoscope"
        label="Triaje"
        caption="Editar / Crear"
        class="bg-pink-2"
      >
        <datos-triaje-tab :paciente="paciente" class="bg-pink-1" />
      </q-expansion-item>
      <q-expansion-item
        v-if="paciente"
        icon="fas fa-folder-open"
        label="Diagnóstico"
        caption="Editar"
        class="bg-blue-2"
      >
        <datos-diagnostico-tab class="bg-blue-1" />
      </q-expansion-item>
      <q-expansion-item
        v-if="diagnosticoSeleccionado"
        icon="fas fa-list-ul"
        label="Controles"
        caption="Editar"
        class="bg-green-2"
      >
        <datos-control-tab class="bg-green-1" />
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTipoDocumentoFetchAllQuery } from 'core/tipo-documento';
import { storeToRefs } from 'pinia';
import BaseInput from 'shared/components/base/BaseInput.vue';
import BaseSelect from 'shared/components/base/BaseSelect.vue';
import Swal from 'sweetalert2';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { number, object, string } from 'yup';
import DatosControlTab from '../components/tabs/DatosControlTab.vue';
import DatosDiagnosticoTab from '../components/tabs/DatosDiagnosticoTab.vue';
import DatosPacienteTab from '../components/tabs/DatosPacienteTab.vue';
import DatosTriajeTab from '../components/tabs/DatosTriajeTab.vue';
import { useDiagnosticoFormStore } from '../stores';

const { fetchPaciente, $reset } = useDiagnosticoFormStore();
const { paciente, isPacienteLoading, diagnosticoSeleccionado } = storeToRefs(
  useDiagnosticoFormStore()
);

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
  numero_documento: number()
    .typeError('Debe ingresar un número')
    .min(8)
    .required()
    .label('Número de Documento'),
  tipo_documento_id: string().required().label('Tipo de Documento'),
});
const { handleSubmit, values } = useForm<{ numero_documento: number }>({
  validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
  // await fetch(values.numero_documento);
  await fetchPaciente(values.numero_documento);

  if (paciente.value) {
    Swal.fire({
      title: 'Exito!',
      text: 'Paciente encontrado correctamente!',
      icon: 'success',
    });
  } else {
    Swal.fire({
      title: 'Información!',
      text: 'No se encontro el paciente indicado!',
      icon: 'info',
    });
  }
});
onBeforeRouteLeave(() => {
  const answer = window.confirm(
    'Esta seguro de salir? Tiene cambios sin guardar!'
  );
  // cancel the navigation and stay on the same page
  if (!answer) {
    return false;
  } else {
    $reset();
  }
});
</script>
