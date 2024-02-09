export interface DiagnosticoCreateRequest {
  financiamiento_id: string;
  empleado_id: string;
  paciente_id: string;
  enfermedades: string[];
  observaciones: string;
}
