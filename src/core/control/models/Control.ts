import { Complicacion } from 'core/complicacion';
import { Empleado } from 'core/empleado';
import { Medicamento } from 'core/medicamento';
import { Triaje } from 'core/triaje';

export interface Control {
  id: string;
  estado: boolean;
  diagnostico_id: number;
  observaciones: string;
  medico_id: number;
  fecha_inicio: string | Date;
  fecha_fin: string | Date;
  medico: {
    data: Empleado;
  };
  triaje: {
    data: Triaje;
  };
  medicamentos: {
    data: Medicamento[];
  };
  complicaciones: {
    data: Complicacion[];
  };
}
