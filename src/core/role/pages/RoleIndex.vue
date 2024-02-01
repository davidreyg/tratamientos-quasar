<template>
  <base-page
    title="Gestion de Roles"
    :loading="false"
    with-add
    @add="$router.push({ name: 'roles.create' })"
  >
    <template #content>
      <roles-table />
    </template>
  </base-page>
</template>

<script setup lang="ts">
import BasePage from 'shared/components/base/BasePage.vue';
import RolesTable from '../components/RolesTable.vue';
</script>

<style scoped></style>
