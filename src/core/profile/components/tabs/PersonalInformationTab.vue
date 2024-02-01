<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 row justify-between">
      <div class="col-auto">
        <div class="text-h5">Datos Personales</div>
        <!-- <div class="text-subtitle2">Actualizar datos personales</div> -->
      </div>
    </div>
    <div class="col-12 row">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <personal-information-form />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PersonalInformationForm from '../forms/PersonalInformationForm.vue';
</script>
