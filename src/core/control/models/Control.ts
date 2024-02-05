import { Complicacion } from 'core/complicacion';
import { Medicamento } from 'core/medicamento';
import { Persona } from 'core/persona';

export interface Control {
  id: string;
  estado: boolean;
  diagnostico_id: number;
  observaciones: string;
  medico_id: number;
  fecha_inicio: string | Date;
  fecha_fin: string | Date;
  medico: {
    data: Persona;
  };
  medicamentos: {
    data: Medicamento[];
  };
  complicaciones: {
    data: Complicacion[];
  };
}
