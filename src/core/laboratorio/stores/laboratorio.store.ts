import { Paciente, PacienteFetchByNumeroDocumentoTask } from 'core/paciente';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLaboratorioFormStore = defineStore('laboratorio-form', () => {
  const paciente = ref<Paciente>();
  const isPacienteLoading = ref(false);
  function $reset() {
    paciente.value = undefined;
  }

  function setPaciente(data: Paciente) {
    paciente.value = data;
  }

  async function fetchPaciente(numero_documento: number) {
    isPacienteLoading.value = true;
    try {
      paciente.value = undefined;
      paciente.value = await PacienteFetchByNumeroDocumentoTask.run(
        numero_documento
      );
      isPacienteLoading.value = false;
    } catch (error) {
      isPacienteLoading.value = false;
      throw error;
    }
  }

  return {
    paciente,
    isPacienteLoading,
    $reset,
    setPaciente,
    fetchPaciente,
  };
});
