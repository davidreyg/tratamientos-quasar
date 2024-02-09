import { Empleado } from 'core/empleado';
import { Enfermedad } from 'core/enfermedad';
import { Establecimiento } from 'core/establecimiento';
import { Financiamiento } from 'core/financiamiento';
import { Paciente } from 'core/paciente';

export interface Diagnostico {
  id: string;
  observaciones: string;
  motivo_finalizacion: string | undefined;
  estado: boolean;
  paciente_id: number;
  medico_id: number;
  created_at: string | Date;
  enfermedades: {
    data: Enfermedad[];
  };
  paciente: {
    data: Paciente;
  };
  medico: {
    data: Empleado;
  };
  financiamiento: {
    data: Financiamiento;
  };
  establecimiento: {
    data: Establecimiento;
  };
}
