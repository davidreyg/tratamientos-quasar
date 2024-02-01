<template>
  <base-table
    v-if="roles && !isRolesLoading"
    :columns="columns"
    :data="roles"
    row-key="id"
    :loading="isRolesLoading || isDeleteLoading"
    @destroy-one="deleteOne"
  >
    <!-- <template #actions-prepend="{ key }">
      <q-btn
        flat
        round
        color="blue-5"
        icon="fas fa-eye"
        :to="{
          name: 'roles.privileges',
          params: { id: key },
        }"
      />
    </template> -->
  </base-table>
</template>

<script setup lang="ts">
import { QTable } from 'quasar';
import BaseTable from 'shared/components/base/BaseTable.vue';
import { NotifyUtils } from 'shared/utils';
import { useRoleDeleteMutation, useRoleListQuery } from '../composables';

const columns: QTable['columns'] = [
  {
    name: 'name',
    align: 'left',
    label: 'Nombre',
    field: 'name',
  },
  {
    name: 'display_name',
    align: 'center',
    label: 'Nombre Display',
    field: 'display_name',
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones',
    field: 'actions',
  },
];

const { roles, isRolesLoading, refetch: refetchRoles } = useRoleListQuery();
const { mutate, isLoading: isDeleteLoading } = useRoleDeleteMutation();

const deleteOne = (key: string) => {
  mutate(key, {
    onSuccess: () => {
      NotifyUtils.success('Exito!');
      refetchRoles.value();
    },
  });
};
</script>

<style scoped></style>
