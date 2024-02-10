// Generated by https://quicktype.io

import { Diagnostico } from 'core/diagnostico';

export interface Paciente {
  id: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  numero_documento: number;
  fecha_nacimiento: string | Date;
  edad: number;
  sexo: string;
  direccion: string;
  telefono: number;
  historia_clinica: string;
  tipo_documento: string;
  real_id: number;
  diagnosticos: {
    data: Diagnostico[];
  };
}