import { Unidad } from 'core/unidad';

export interface Item {
  object: string;
  id: string;
  nombre: string;
  examen_id: number;
  seccion_id: number;
  unidads: {
    data: Unidad[];
  };
  pivot: {
    item_id: number;
    unidad_id: number;
    minimo: number;
    maximo: number;
  }[];
}
