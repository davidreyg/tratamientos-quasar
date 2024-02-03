export interface DiagnosticoCreateRequest {
  financiamiento_id: string;
  medico_id: string;
  paciente_id: string;
  enfermedades: string[];
  observaciones: string;
}
