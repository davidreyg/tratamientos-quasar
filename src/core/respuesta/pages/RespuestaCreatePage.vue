<template>
  <respuesta-create-form @submit="$router.back()" @cancel="$router.back()" />
</template>

<script setup lang="ts">
import RespuestaCreateForm from '../components/forms/RespuestaCreateForm.vue';
</script>

<style scoped></style>
