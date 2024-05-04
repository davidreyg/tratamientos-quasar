<template>
  <unidad-create-form @submit="$router.back()" @cancel="$router.back()" />
</template>

<script setup lang="ts">
import UnidadCreateForm from '../components/forms/SeccionCreateForm.vue';
</script>

<style scoped></style>
