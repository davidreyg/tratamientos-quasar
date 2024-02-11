<template>
  <base-table
    v-if="roles && !isRolesLoading"
    :columns="columns"
    :data="roles"
    row-key="id"
    :show-grid-toggle="false"
    :loading="isRolesLoading"
  >
    <template #actions="{ key }">
      <q-item
        v-close-popup
        clickable
        @click="
          $router.push({ name: 'roles.privilegios', params: { id: key } })
        "
      >
        <q-item-section avatar>
          <q-icon name="fas fa-clipboard-list" color="secondary" />
        </q-item-section>
        <q-item-section>Privilegios</q-item-section>
      </q-item>
      <q-separator />
    </template>
  </base-table>
</template>

<script setup lang="ts">
import { QTable } from 'quasar';
import BaseTable from 'shared/components/base/BaseTable.vue';
import { useRoleListQuery } from '../composables';

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
defineEmits<{
  destroy: [key: number];
  editPrivileges: [key: number];
}>();
const { roles, isRolesLoading } = useRoleListQuery();
// const { mutate, isLoading: isDeleteLoading } = useRoleDeleteMutation();

// const deleteOne = (key: string) => {
//   mutate(key, {
//     onSuccess: () => {
//       NotifyUtils.success('Exito!');
//       refetchRoles.value();
//     },
//   });
// };
</script>

<style scoped></style>
