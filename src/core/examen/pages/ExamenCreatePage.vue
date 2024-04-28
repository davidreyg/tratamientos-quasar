<template>
  <examen-create-form @submit="$router.back()" @cancel="$router.back()" />
</template>

<script setup lang="ts">
import ExamenCreateForm from '../components/forms/ExamenCreateForm.vue';
</script>

<style scoped></style>
