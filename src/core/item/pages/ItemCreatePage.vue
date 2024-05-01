<template>
  <item-create-form @submit="$router.back()" @cancel="$router.back()" />
</template>

<script setup lang="ts">
import ItemCreateForm from '../components/forms/ItemCreateForm.vue';
</script>

<style scoped></style>
