<template>
  <establecimiento-create-form
    @submit="$router.back()"
    @cancel="$router.back()"
  />
</template>

<script setup lang="ts">
import EstablecimientoCreateForm from '../components/forms/EstablecimientoCreateForm.vue';
</script>

<style scoped></style>
