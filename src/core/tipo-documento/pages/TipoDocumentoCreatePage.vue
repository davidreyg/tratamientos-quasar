<template>
  <base-page title="Nuevo Tipo de Documento" :loading="false">
    <template #content>
      <tipo-documento-create-form
        @submit="$router.back()"
        @cancel="$router.back()"
      />
    </template>
  </base-page>
</template>

<script setup lang="ts">
import BasePage from 'shared/components/base/BasePage.vue';
import TipoDocumentoCreateForm from '../components/forms/TipoDocumentoCreateForm.vue';
</script>

<style scoped></style>
