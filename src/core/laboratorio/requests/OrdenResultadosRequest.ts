export interface OrdenResultadosRequest {
  examen_id: number;
  resultado: number;
  unidad_id: number;
  fecha_resultado: string;
  is_canceled: boolean;
  motivo: string;
}
