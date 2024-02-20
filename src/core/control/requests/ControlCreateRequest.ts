export interface ControlCreateRequest {
  fecha_inicio: string | Date;
  fecha_fin: string | Date;
  diagnostico_id: string;
  observaciones: string;
  empleado_id: number;
  medicamentos: string[];
  complicaciones: string[] | undefined;
}
