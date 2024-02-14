<template>
  <q-card class="my-card">
    <q-card-section>
      <paciente-edit-form
        v-if="paciente"
        :paciente="paciente"
        @cancel="onCancelPacienteForm"
      />
      <paciente-create-form
        v-else-if="!paciente && isPacienteFormVisible"
        @cancel="onCancelPacienteForm"
        @submit="onSubmitPacienteCreateForm"
      />
      <div
        v-if="!paciente && !isPacienteFormVisible"
        class="col-12 row justify-center"
      >
        <div class="col-auto">
          <q-icon name="fas fa-face-frown" size="xl" />
        </div>
        <div class="col-12 text-center text-h6">
          Lo sentimos. ¡No se encontró ningun paciente!
        </div>
        <q-btn
          class="q-mt-lg"
          color="primary"
          icon="fas fa-plus"
          no-caps
          label="Agregar nuevo paciente"
          outline
          @click="isPacienteFormVisible = !isPacienteFormVisible"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useDiagnosticoFormStore } from 'core/diagnostico';
import PacienteCreateForm from 'core/paciente/components/PacienteCreateForm.vue';
import PacienteEditForm from 'core/paciente/components/PacienteEditForm.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const { paciente } = storeToRefs(useDiagnosticoFormStore());
const { $reset, fetchPaciente } = useDiagnosticoFormStore();
const isPacienteFormVisible = ref(false);
const onCancelPacienteForm = () => {
  isPacienteFormVisible.value = false;
  $reset();
};

const onSubmitPacienteCreateForm = async (numero_documento: number) => {
  // $reset();
  onCancelPacienteForm();
  await fetchPaciente(numero_documento);
};
</script>
