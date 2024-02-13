<template>
  <base-table
    :columns="columns"
    :data="data"
    :loading="loading"
    row-key="id"
    :show-grid-toggle="false"
    :server-pagination="serverPagination"
    @request="(req) => $emit('request', req)"
  >
    <template #actions="{ key }">
      <!-- <q-item v-close-popup clickable @click="$emit('edit', key)">
        <q-item-section avatar>
          <q-icon name="fas fa-pen-to-square" color="warning" />
        </q-item-section>
        <q-item-section>Editar</q-item-section>
      </q-item>
      <q-separator /> -->
      <q-item v-close-popup clickable @click="emitDestroyOne(key)">
        <q-item-section avatar>
          <q-icon name="fas fa-trash-can" color="negative" />
        </q-item-section>
        <q-item-section>Eliminar</q-item-section>
      </q-item>
    </template>
  </base-table>
</template>

<script setup lang="ts">
import { QTable } from 'quasar';
import BaseTable from 'shared/components/base/BaseTable.vue';
import {
  OnRequestParameter,
  ServerPagination,
  useLuxonFormat,
} from 'shared/utils';
import Swal from 'sweetalert2';
import { PropType } from 'vue';
import { useDiagnosticoDeleteMutation } from '../composables';
import { Diagnostico } from '../models';

defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  data: {
    type: Array<Diagnostico>,
    required: true,
  },
  serverPagination: {
    type: Object as PropType<ServerPagination>,
    default: undefined,
  },
});
const emit = defineEmits<{
  destroyOne: [key: string];
  // edit: [key: string];
  request: [req: OnRequestParameter];
}>();
const { formatDate } = useLuxonFormat();
const columns: QTable['columns'] = [
  {
    name: 'fecha',
    align: 'center',
    label: 'Fecha',
    field: 'created_at',
    format: (val: string) => formatDate(val),
  },
  {
    name: 'enfermedades',
    align: 'left',
    label: 'Enfermedades',
    field: (row) => {
      return row.enfermedades.data.map(
        (value: { nombre: string }) => value.nombre
      );
    },
  },
  {
    name: 'Descripcion',
    align: 'center',
    label: 'Descripcion',
    field: 'observaciones',
  },
  {
    name: 'estado',
    align: 'center',
    label: 'Estado',
    field: 'estado',
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones',
    field: 'actions',
  },
];
const { mutateAsync } = useDiagnosticoDeleteMutation();
const emitDestroyOne = (keys: string) => {
  Swal.fire({
    title: '¿Está seguro de eliminar este registro?',
    text: 'No podra deshacer los cambios!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      await mutateAsync(Number(keys), {
        onSuccess: async () => {
          emit('destroyOne', keys);
        },
        onError: () => {
          Swal.hideLoading();
        },
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};
</script>

<style scoped></style>
