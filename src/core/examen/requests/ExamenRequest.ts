export interface ExamenRequest {
  codigo: string;
  nombre: string;
  precio: number;
  categoria_id: number;
  is_active: boolean;
  tipo: string;
  pivot: {
    examen_id: number;
    unidad_id: number;
    minimo: number;
    maximo: number;
  }[];
  respuesta_ids: number[];
}