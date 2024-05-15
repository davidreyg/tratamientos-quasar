import { Establecimiento } from 'core/establecimiento';
import { Examen } from 'core/examen';
import { Item } from 'core/item';
import { Paciente } from 'core/paciente';

export interface Orden {
  id: number;
  diagnostico: string;
  CI10?: string;
  CPN?: string;
  EG?: string;
  codigo_atencion: string;
  numero_orden: number;
  fecha_registro: string;
  medico: string;
  observaciones: string;
  establecimiento_id: number;
  paciente_id: number;
  establecimiento_otro?: string;
  establecimiento: { data: Establecimiento } | null;
  paciente: { data: Paciente };
  examens: { data: Examen[] };
  items: { data: Item[] };
  pivot: {
    orden_id: number;
    examen_id: number;
    resultado: number;
    unidad_id: number;
    respuesta_id: number;
    fecha_resultado: string;
    is_canceled: boolean;
    motivo: string;
  }[];
  item_orden: {
    orden_id: number;
    item_id: number;
    resultado: number;
    unidad_id: number;
    respuesta_id: number;
    is_canceled: boolean;
  }[];
}
