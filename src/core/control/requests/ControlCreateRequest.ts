export interface ControlCreateRequest {
  fecha_inicio: string | Date;
  fecha_fin: string | Date;
  diagnostico_id: string;
  medico_id: string;
  medicamentos: string[];
  complicaciones: string[] | undefined;
}
