<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 row justify-between">
      <div class="col-auto">
        <div class="text-h5">Datos del Usuario</div>
        <div class="text-subtitle2">
          Actualizar datos del usuario como contraseña, foto de perfil, etc...
        </div>
      </div>
    </div>
    <div class="col-12 row">
      <div class="col-12">
        <user-information-form />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInformationForm from '../forms/UserInformationForm.vue';
</script>
