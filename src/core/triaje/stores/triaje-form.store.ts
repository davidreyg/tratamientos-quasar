import { Paciente, PacienteFetchByNumeroDocumentoTask } from 'core/paciente';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Triaje } from '../models';

export const useTriajeFormStore = defineStore('triaje-form', () => {
  const paciente = ref<Paciente>();
  const diagnosticosDelPaciente = ref<Triaje[]>([]);
  const diagnosticoSeleccionado = ref<Triaje>();
  const isPacienteLoading = ref(false);

  function $reset() {
    paciente.value = undefined;
    diagnosticoSeleccionado.value = undefined;
    diagnosticosDelPaciente.value = [];
  }

  function setPaciente(data: Paciente) {
    paciente.value = data;
  }
  function setDiagnosticoSeleccionado(data: Triaje) {
    diagnosticoSeleccionado.value = data;
  }

  async function fetchPaciente(numero_documento: number) {
    isPacienteLoading.value = true;
    paciente.value = undefined;
    try {
      paciente.value = await PacienteFetchByNumeroDocumentoTask.run(
        numero_documento
      );
      diagnosticosDelPaciente.value = [];
      isPacienteLoading.value = false;
    } catch (error) {
      isPacienteLoading.value = false;
      throw error;
    }
  }
  return {
    paciente,
    diagnosticosDelPaciente,
    diagnosticoSeleccionado,
    isPacienteLoading,
    $reset,
    setPaciente,
    fetchPaciente,
    setDiagnosticoSeleccionado,
  };
});
