<template>
  <base-form @cancel="$emit('cancel')">
    <base-input
      borderless
      :outlined="false"
      readonly
      name="financiamiento_id"
      label="Financiamiento"
      class="col-xs-12 col-sm-6"
      :value="diagnostico.financiamiento.data.nombre"
    />
    <base-input
      borderless
      :outlined="false"
      readonly
      name="medico_id"
      label="Medico"
      class="col-xs-12 col-sm-6"
      :value="
        diagnostico.medico.data.nombres +
        ' ' +
        diagnostico.medico.data.apellido_paterno +
        ' ' +
        diagnostico.medico.data.apellido_materno
      "
    />
    <div class="col-xs-12 col-sm-6">
      <div>Enfermedades</div>
      <ul>
        <li v-for="field in diagnostico.enfermedades.data" :key="field.id">
          {{ field.nombre }}
        </li>
      </ul>
    </div>
    <base-input
      borderless
      :outlined="false"
      readonly
      type="textarea"
      name="observaciones"
      label="Observaciones"
      class="col-xs-12 col-sm-6"
      :value="diagnostico.observaciones"
    />
  </base-form>
</template>

<script setup lang="ts">
import BaseForm from 'shared/components/base/BaseForm.vue';
import BaseInput from 'shared/components/base/BaseInput.vue';
import { PropType } from 'vue';
import { Diagnostico } from '../models';

defineProps({
  diagnostico: {
    type: Object as PropType<Diagnostico>,
    required: true,
  },
});
defineEmits<{
  // (e: 'submit', paciente_id: string): void;
  (e: 'cancel'): void;
}>();
</script>

<style scoped></style>
