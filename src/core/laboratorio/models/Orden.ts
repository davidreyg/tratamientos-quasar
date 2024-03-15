export interface Orden {
  id: number;
  diagnostico: string;
  CI10: string;
  CPN: string;
  EG: string;
  codigo_atencion: string;
  fecha_registro: string;
  establecimiento_id: number;
  pivot: {
    orden_id: number;
    examen_id: number;
    resultado: number;
    unidad_id: number;
    fecha_resultado: string;
    is_canceled: boolean;
    motivo: string;
  }[];
}
