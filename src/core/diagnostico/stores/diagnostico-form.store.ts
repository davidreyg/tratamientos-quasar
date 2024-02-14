import { Control } from 'core/control';
import { Paciente, PacienteFetchByNumeroDocumentoTask } from 'core/paciente';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Diagnostico } from '../models';
import { FetchDiagnosticosByPacienteTask } from '../tasks';

export const useDiagnosticoFormStore = defineStore('diagnostico-form', () => {
  const paciente = ref<Paciente>();
  const diagnosticosDelPaciente = ref<Diagnostico[]>([]);
  const diagnosticoSeleccionado = ref<Diagnostico>();
  const controlesDelDiagnostico = ref<Control[]>([]);
  const controlSeleccionado = ref<Control>();
  const isPacienteLoading = ref(false);

  function $reset() {
    paciente.value = undefined;
    diagnosticoSeleccionado.value = undefined;
    diagnosticosDelPaciente.value = [];
    controlSeleccionado.value = undefined;
    controlesDelDiagnostico.value = [];
  }

  function setPaciente(data: Paciente) {
    paciente.value = data;
  }
  function setDiagnosticoSeleccionado(data: Diagnostico) {
    diagnosticoSeleccionado.value = data;
  }
  function setControlSeleccionado(data: Control) {
    controlSeleccionado.value = data;
  }
  function setControlesDelDiagnostico(data: Control[]) {
    controlesDelDiagnostico.value = data;
  }

  async function fetchPaciente(numero_documento: number) {
    isPacienteLoading.value = true;
    try {
      paciente.value = await PacienteFetchByNumeroDocumentoTask.run(
        numero_documento
      );
      diagnosticosDelPaciente.value = [];
      if (paciente.value) {
        await fetchDiagnosticosDelPaciente(paciente.value.id);
      }
      isPacienteLoading.value = false;
    } catch (error) {
      isPacienteLoading.value = false;
      throw error;
    }
  }

  async function fetchDiagnosticosDelPaciente(id: string) {
    // isPacienteLoading.value = true;
    try {
      diagnosticosDelPaciente.value = await FetchDiagnosticosByPacienteTask.run(
        id
      );
      // isPacienteLoading.value = false;
    } catch (error) {
      // isPacienteLoading.value = false;
      throw error;
    }
  }

  // async function fetchDiagnosticoById(id: string) {
  //   diagnosticoSeleccionado.value = undefined;
  //   try {
  //     diagnosticoSeleccionado.value = await FetchDiagnosticoByIdTask.run(id);
  //     // controles.value = [];
  //     // if (diagnostico.value) {
  //     //   await fetchControles(diagnostico.value.id);
  //     // }
  //     // isLoading.value = false;
  //   } catch (error) {
  //     throw error;
  //     // isLoading.value = false;
  //   }
  // }
  return {
    paciente,
    diagnosticosDelPaciente,
    diagnosticoSeleccionado,
    isPacienteLoading,
    controlesDelDiagnostico,
    controlSeleccionado,
    $reset,
    setPaciente,
    fetchPaciente,
    fetchDiagnosticosDelPaciente,
    // fetchDiagnosticoById,
    setDiagnosticoSeleccionado,
    setControlSeleccionado,
    setControlesDelDiagnostico,
  };
});
