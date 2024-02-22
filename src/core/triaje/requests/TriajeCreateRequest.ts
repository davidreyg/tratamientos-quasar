export interface TriajeCreateRequest {
  pivot: { signo_id: number; valor: number }[];
  fecha_registro: string | Date;
  paciente_id: number;
}
