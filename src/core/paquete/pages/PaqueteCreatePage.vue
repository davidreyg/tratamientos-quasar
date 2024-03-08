<template>
  <paquete-create-form @submit="$router.back()" @cancel="$router.back()" />
</template>

<script setup lang="ts">
import PaqueteCreateForm from '../components/forms/PaqueteCreateForm.vue';
</script>

<style scoped></style>
