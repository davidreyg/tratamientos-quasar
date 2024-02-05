import { Enfermedad } from 'core/enfermedad';
import { Establecimiento } from 'core/establecimiento';
import { Financiamiento } from 'core/financiamiento';
import { Persona } from 'core/persona';

export interface Diagnostico {
  id: string;
  observaciones: string;
  estado: boolean;
  paciente_id: number;
  medico_id: number;
  created_at: string | Date;
  enfermedades: {
    data: Enfermedad[];
  };
  paciente: {
    data: Persona;
  };
  medico: {
    data: Persona;
  };
  financiamiento: {
    data: Financiamiento;
  };
  establecimiento: {
    data: Establecimiento;
  };
}
