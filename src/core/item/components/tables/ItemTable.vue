<template>
  <base-table
    :columns="columns"
    :data="data"
    :loading="loading"
    row-key="id"
    :server-pagination="serverPagination"
    :show-grid-toggle="false"
  >
    <template #actions="{ key }">
      <item-table-actions
        :id="key"
        @edit="$emit('edit', key)"
        @destroy="emitDestroyOne(key)"
      />
    </template>
  </base-table>
</template>

<script setup lang="ts">
import { Item, useItemDeleteMutation } from 'core/item';
import { QTable } from 'quasar';
import BaseTable from 'shared/components/base/BaseTable.vue';
import { ServerPagination } from 'shared/utils';
import Swal from 'sweetalert2';
import { PropType } from 'vue';
import ItemTableActions from './ItemTableActions.vue';
defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  data: {
    type: Array<Item>,
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
const columns: QTable['columns'] = [
  {
    name: 'nombre',
    align: 'left',
    label: 'Nombre',
    field: 'nombre',
    sortable: true,
  },
  // {
  //   name: 'categoria',
  //   align: 'center',
  //   label: 'Categoria',
  //   field: (row) => row.categoria.data.nombre,
  //   sortable: true,
  // },
  {
    name: 'tipo',
    align: 'center',
    label: 'Tipo',
    field: 'tipo',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'right',
    label: '',
    field: 'actions',
  },
];
const { mutateAsync } = useItemDeleteMutation();
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
