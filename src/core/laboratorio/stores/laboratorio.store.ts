import { Paciente, PacienteFetchByNumeroDocumentoTask } from 'core/paciente';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { OrdenApi } from '../api';
import { Orden } from '../models';

export const useLaboratorioFormStore = defineStore('laboratorio-form', () => {
  const paciente = ref<Paciente>();
  const ordenesSeleccionada = ref<Orden>();
  const ordenSeleccionada = ref<Orden>();
  const isPacienteLoading = ref(false);
  const isOrdenLoading = ref(false);

  function $reset() {
    paciente.value = undefined;
    ordenesSeleccionada.value = undefined;
    ordenSeleccionada.value = undefined;
  }

  function setPaciente(data: Paciente) {
    paciente.value = data;
  }

  function setOrdenesDelPaciente(data: Orden) {
    ordenesSeleccionada.value = data;
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

  async function fetchOrdenById(id: number) {
    isOrdenLoading.value = true;
    try {
      ordenSeleccionada.value = undefined;
      ordenSeleccionada.value = (await OrdenApi.fetchById(id)).data().data;
      isOrdenLoading.value = false;
    } catch (error) {
      isOrdenLoading.value = false;
      throw error;
    }
  }

  return {
    paciente,
    isPacienteLoading,
    isOrdenLoading,
    ordenesSeleccionada,
    ordenSeleccionada,
    $reset,
    setPaciente,
    fetchOrdenById,
    setOrdenesDelPaciente,
    fetchPaciente,
  };
});
