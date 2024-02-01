<template>
  <base-page title="Permisos del Rol" :loading="isPermissionIdsLoading">
    <template #content>
      {{ selected }}
      <div v-for="permiso in permissions" :key="permiso.id">
        <q-item v-ripple tag="label">
          <q-item-section side top>
            <q-checkbox v-model="selected" :val="permiso.id" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ permiso.name }}</q-item-label>
            <q-item-label caption>
              {{ permiso.description }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </template>
  </base-page>
</template>

<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';
import { useApiPermission } from 'core/permission';
import BasePage from 'shared/components/base/BasePage.vue';
import { ref } from 'vue';
//TODO: Falta gestion de roles... lo dejamos por  ahora :v
const role_id = useRouteParams('id', undefined, { transform: Number });
const { permissions, useRolePermissionsQuery } = useApiPermission();
const { data: permissionsSelected, isLoading: isPermissionIdsLoading } =
  useRolePermissionsQuery(role_id.value, !!role_id.value);
const selected = ref<string[]>([]);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
selected.value = permissionsSelected.value!;
</script>

<style scoped></style>
