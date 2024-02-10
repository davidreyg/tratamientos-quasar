<template>
  <tipo-documento-create-form
    @submit="$router.back()"
    @cancel="$router.back()"
  />
</template>

<script setup lang="ts">
import TipoDocumentoCreateForm from '../components/forms/TipoDocumentoCreateForm.vue';
</script>

<style scoped></style>
