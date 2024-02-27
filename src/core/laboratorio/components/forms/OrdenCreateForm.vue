<template>
  <base-form>
    <base-input
      name="diagnostico"
      label="Diagnostico"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input name="CI10" label="CI10" class="col-xs-12 col-sm-4" required />
    <base-input name="CPN" label="CPN" class="col-xs-12 col-sm-4" required />
    <base-input name="EG" label="EG" class="col-xs-12 col-sm-4" required />
    <base-input
      name="codigo_atencion"
      label="Codigo de Atención"
      class="col-xs-12 col-sm-4"
      required
    />
    <base-input
      name="fecha_registro"
      label="Fecha de Registro"
      class="col-xs-12 col-sm-4"
      type="date"
      required
    />
  </base-form>
</template>

<script setup lang="ts">
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';

console.log('first');
</script>
