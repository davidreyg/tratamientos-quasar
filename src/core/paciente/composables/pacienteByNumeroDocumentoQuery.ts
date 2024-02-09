import { useFetchDiagnosticosByPacienteQuery } from 'core/diagnostico';
import { ref } from 'vue';
import { Paciente } from '../models';
import { PacienteFetchByNumeroDocumentoTask } from '../tasks';

export function usePacienteByNumeroDocumentoQuery() {
  const paciente = ref<Paciente>();
  const isLoading = ref(false);
  const {
    fetch: fetchDiagnosticos,
    diagnosticos,
    isDiagnosticosEmpty,
  } = useFetchDiagnosticosByPacienteQuery();
  const fetch = async (numero_documento: number) => {
    isLoading.value = true;
    paciente.value = undefined;
    try {
      paciente.value = await PacienteFetchByNumeroDocumentoTask.run(
        numero_documento
      );
      diagnosticos.value = undefined;
      if (paciente.value) {
        await fetchDiagnosticos(paciente.value.id);
      }
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
    }
  };

  return {
    paciente,
    diagnosticos,
    isDiagnosticosEmpty,
    isLoading,
    fetch,
    fetchDiagnosticos,
  };
}
