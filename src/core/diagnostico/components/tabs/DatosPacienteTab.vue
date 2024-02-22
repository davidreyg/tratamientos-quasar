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
import { Paciente } from 'core/paciente';
import PacienteCreateForm from 'core/paciente/components/PacienteCreateForm.vue';
import PacienteEditForm from 'core/paciente/components/PacienteEditForm.vue';
import { PropType, ref } from 'vue';

defineProps({
  paciente: {
    type: Object as PropType<Paciente>,
    required: false,
    default: undefined,
  },
});
const emit = defineEmits<{
  (e: 'submit', numero_documento: number): void;
  (e: 'cancel'): void;
}>();
const isPacienteFormVisible = ref(false);
const onCancelPacienteForm = () => {
  isPacienteFormVisible.value = false;
  emit('cancel');
};

const onSubmitPacienteCreateForm = async (numero_documento: number) => {
  onCancelPacienteForm();
  emit('submit', numero_documento);
};
</script>
