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
      <q-item v-close-popup clickable @click="$emit('edit', key)">
        <q-item-section avatar>
          <q-icon name="fas fa-pen-to-square" color="warning" />
        </q-item-section>
        <q-item-section>Editar</q-item-section>
      </q-item>
      <q-separator />
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
import { OnRequestParameter, ServerPagination } from 'shared/utils';
import Swal from 'sweetalert2';
import { PropType } from 'vue';
import { useEmpleadoDeleteMutation } from '../composables';
import { Empleado } from '../models';

defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  data: {
    type: Array<Empleado>,
    required: true,
  },
  serverPagination: {
    type: Object as PropType<ServerPagination>,
    default: undefined,
  },
});
const emit = defineEmits<{
  destroyOne: [key: string];
  edit: [key: string];
  request: [req: OnRequestParameter];
}>();

const columns: QTable['columns'] = [
  {
    name: 'nombres',
    align: 'left',
    label: 'Nombres',
    field: (row) =>
      `${row.nombres} ${row.apellido_paterno} ${row.apellido_materno}`,
    sortable: true,
  },
  {
    name: 'establecimientos:establecimiento_id|establecimientos.nombre',
    align: 'center',
    label: 'Establecimiento',
    sortable: true,
    field: (row) => row.establecimiento.data.nombre,
  },
  {
    name: 'cargos:cargo_id|cargos.nombre',
    align: 'center',
    label: 'Cargo',
    sortable: true,
    field: (row) => row.cargo.data.nombre,
  },
  {
    name: 'numero_documento',
    align: 'center',
    label: 'N° de Documento',
    sortable: false,
    field: (row) => row.numero_documento,
  },
  {
    name: 'actions',
    align: 'right',
    label: '',
    field: 'actions',
  },
];
const { mutateAsync } = useEmpleadoDeleteMutation();
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
