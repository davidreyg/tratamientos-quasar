<template>
  <base-table
    :columns="columns"
    :data="data"
    :loading="loading"
    row-key="id"
    :show-grid-toggle="false"
  >
    <template #actions="{ key }">
      <triajes-table-actions
        :id="key"
        @edit="$emit('edit', key)"
        @destroy="emitDestroyOne(key)"
      />
    </template>
  </base-table>
</template>

<script setup lang="ts">
import { Triaje, useTriajeDeleteMutation } from 'core/triaje';
import { QTable } from 'quasar';
import BaseTable from 'shared/components/base/BaseTable.vue';
import { ServerPagination, useLuxonFormat } from 'shared/utils';
import Swal from 'sweetalert2';
import { PropType } from 'vue';
import TriajesTableActions from './TriajesTableActions.vue';
defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  data: {
    type: Array<Triaje>,
    required: true,
  },
  serverPagination: {
    type: Object as PropType<ServerPagination>,
    default: undefined,
  },
});
const emit = defineEmits<{
  destroyOne: [key: number];
  edit: [key: number];
  // request: [req: OnRequestParameter];
}>();
const { formatDate } = useLuxonFormat();
const columns: QTable['columns'] = [
  {
    name: 'fecha_registro',
    align: 'left',
    label: 'Fecha de Registro',
    field: 'fecha_registro',
    format: (val) => formatDate(val),
    sortable: true,
  },
  // {
  //   name: 'digitos',
  //   align: 'center',
  //   label: 'Digitos',
  //   field: 'digitos',
  // },
  {
    name: 'actions',
    align: 'right',
    label: 'Acciones',
    field: 'actions',
  },
];
const { mutateAsync } = useTriajeDeleteMutation();
const emitDestroyOne = (key: number) => {
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
      // console.log(key, typeof key);
      await mutateAsync(key, {
        onSuccess: async () => {
          emit('destroyOne', key);
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
