import { Complicacion } from 'core/complicacion';
import { Medicamento } from 'core/medicamento';
import { Persona } from 'core/persona';

export interface Control {
  id: string;
  estado: boolean;
  diagnostico_id: number;
  medico_id: number;
  fecha_incio: string | Date;
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
