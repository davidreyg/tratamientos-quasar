<template>
  <empleado-create-form @submit="$router.back()" @cancel="$router.back()" />
</template>

<script setup lang="ts">
import EmpleadoCreateForm from '../components/forms/EmpleadoCreateForm.vue';
</script>

<style scoped></style>
