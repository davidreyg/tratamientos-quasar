export interface OrdenCreateRequest {
  diagnostico: string;
  CI10: string;
  CPN: string;
  EG: string;
  codigo_atencion: string;
  fecha_registro: string;
  establecimiento_otro?: string;
  medico: string;
  paciente_id: number;
  empleado_id: number;
  examen_ids: number[];
  establecimiento_id?: number;
  paquete_ids: number[];
}
