<template>
  <categoria-create-form @submit="$router.back()" @cancel="$router.back()" />
</template>

<script setup lang="ts">
import CategoriaCreateForm from '../components/forms/CategoriaCreateForm.vue';
</script>

<style scoped></style>
