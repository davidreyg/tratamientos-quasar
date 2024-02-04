export interface ControlCreateRequest {
  fecha_inicio: string;
  fecha_fin: string;
  diagnostico_id: string;
  medico_id: string;
  medicamentos: string[];
  complicaciones: string[] | undefined;
}
