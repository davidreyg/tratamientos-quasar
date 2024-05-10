export interface ItemRequest {
  codigo: string;
  nombre: string;
  seccion_id: number;
  examen_id: number;
  tipo: string;
  pivot: {
    item_id: number;
    unidad_id: number;
    minimo: number;
    maximo: number;
    tipo: string;
    operador: string;
  }[];
  respuesta_ids: number[];
}
