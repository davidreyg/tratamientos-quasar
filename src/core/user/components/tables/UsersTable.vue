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
      <users-table-actions
        :id="key"
        @edit="$emit('edit', key)"
        @destroy="emitDestroyOne(key)"
      />
    </template>
  </base-table>
</template>

<script setup lang="ts">
import { User, useUserDeleteMutation } from 'core/user';
import { QTable } from 'quasar';
import BaseTable from 'shared/components/base/BaseTable.vue';
import { ServerPagination } from 'shared/utils';
import Swal from 'sweetalert2';
import { PropType } from 'vue';
import UsersTableActions from './UsersTableActions.vue';
defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  data: {
    type: Array<User>,
    required: true,
  },
  serverPagination: {
    type: Object as PropType<ServerPagination>,
    default: undefined,
  },
});
const emit = defineEmits<{
  destroyOne: [key: number];
  edit: [key: string];
  // request: [req: OnRequestParameter];
}>();
const columns: QTable['columns'] = [
  {
    name: 'nombre_completo',
    align: 'left',
    label: 'Nombre',
    field: 'nombre_completo',
    sortable: true,
  },
  {
    name: 'name',
    align: 'center',
    label: 'Usuario',
    field: 'name',
    sortable: true,
  },
  {
    name: 'cargo',
    align: 'center',
    label: 'Cargo',
    field: 'cargo',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'right',
    label: '',
    field: 'actions',
  },
];
const { mutateAsync } = useUserDeleteMutation();
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
