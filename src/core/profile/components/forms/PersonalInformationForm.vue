<template>
  <!-- <base-form no-actions @submit="onSubmit" @cancel="resetForm"> -->
  <div class="row q-col-gutter-lg">
    <base-input
      disable
      name="names"
      label="Nombres"
      class="col-xs-12 col-sm-6 col-md-6"
    />
    <base-input
      disable
      name="surnames"
      label="Apellidos"
      class="col-xs-12 col-sm-6 col-md-6"
    />
    <base-input
      disable
      name="email"
      label="Correo electronico"
      class="col-xs-12 col-sm-6 col-md-6"
    />
    <base-input
      disable
      name="phone"
      label="Celular"
      class="col-xs-12 col-sm-6 col-md-6"
    />
    <base-input
      disable
      name="university_code"
      label="Código Universitario"
      class="col-xs-12 col-sm-6 col-md-6"
    />
    <base-input
      disable
      name="religion"
      label="Religión"
      class="col-xs-12 col-sm-6 col-md-6"
    />
  </div>
  <!-- </base-form> -->
</template>

<script setup lang="ts">
import { useAuthStore } from 'core/auth/stores';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { useForm } from 'vee-validate';

const { person } = useAuthStore();
useForm({
  initialValues: {
    names: person?.names,
    surnames: person?.surnames,
    email: person?.email,
    phone: person?.phone,
    university_code: person?.university_code,
    religion: person?.religion,
  },
});
</script>

<style scoped></style>
