import { Complicacion } from 'core/complicacion';
import { Empleado } from 'core/empleado';
import { Medicamento } from 'core/medicamento';

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
  medicamentos: {
    data: Medicamento[];
  };
  complicaciones: {
    data: Complicacion[];
  };
}
