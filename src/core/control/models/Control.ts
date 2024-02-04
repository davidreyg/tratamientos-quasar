export interface Control {
  id: string;
  estado: boolean;
  diagnostico_id: number;
  medico_id: number;
  fecha_incio: string | Date;
  fecha_fin: string | Date;
}
