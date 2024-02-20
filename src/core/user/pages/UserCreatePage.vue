<template>
  <user-create-form @submit="$router.back()" @cancel="$router.back()" />
</template>

<script setup lang="ts">
import UserCreateForm from '../components/forms/UserCreateForm.vue';
</script>
