import { Respuesta } from 'core/respuesta';
import { Unidad } from 'core/unidad';
export interface Item {
  object: string;
  id: number;
  nombre: string;
  tipo: string;
  examen_id: number;
  seccion_id: number;
  unidads: {
    data: Unidad[];
  };
  respuestas: {
    data: Respuesta[];
  };
  pivot: {
    item_id: number;
    unidad_id: number;
    minimo: number;
    maximo: number;
  }[];
}
