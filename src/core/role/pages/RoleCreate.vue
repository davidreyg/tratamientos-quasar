<template>
  <base-page title="Nuevo Rol" :loading="false">
    <template #content>
      <role-create-form @submit="$router.back()" @cancel="$router.back()" />
    </template>
  </base-page>
</template>

<script setup lang="ts">
import BasePage from 'shared/components/base/BasePage.vue';
import RoleCreateForm from '../components/RoleCreateForm.vue';
</script>

<style scoped></style>
