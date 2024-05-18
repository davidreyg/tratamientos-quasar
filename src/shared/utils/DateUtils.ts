import { DateTime } from 'luxon';
import { QSelectOption } from 'quasar';

export interface Month {
  numero: string;
  mes: string;
}
export const arr_months: Month[] = [
  { numero: '01', mes: 'Enero' },
  { numero: '02', mes: 'Febrero' },
  { numero: '03', mes: 'Marzo' },
  { numero: '04', mes: 'Abril' },
  { numero: '05', mes: 'Mayo' },
  { numero: '06', mes: 'Junio' },
  { numero: '07', mes: 'Julio' },
  { numero: '08', mes: 'Agosto' },
  { numero: '09', mes: 'Septiembre' },
  { numero: '10', mes: 'Octubre' },
  { numero: '11', mes: 'Noviembre' },
  { numero: '12', mes: 'Diciembre' },
];
export const dateRange: QSelectOption[] = [
  {
    label: 'Hoy',
    value: 'Hoy',
  },
  {
    label: 'Esta semana',
    value: 'Esta semana',
  },
  {
    label: 'Este mes',
    value: 'Este mes',
  },
  // {
  //   label: ,
  //   value: 'This Quarter',
  // },
  {
    label: 'Este año',
    value: 'Este año',
  },
  {
    label: 'Personalizado',
    value: 'Personalizado',
  },
];

export function onChangeDateRange(rango: string): {
  fecha_inicio: string;
  fecha_fin: string;
} {
  const fechas = { fecha_inicio: '', fecha_fin: '' };
  switch (rango) {
    case 'Hoy':
      fechas.fecha_inicio = DateTime.now().toISODate();
      fechas.fecha_fin = DateTime.now().toISODate();
      break;
    case 'Esta semana':
      fechas.fecha_inicio = DateTime.now().startOf('week').toISODate();
      fechas.fecha_fin = DateTime.now().endOf('week').toISODate();
      break;
    case 'Este mes':
      fechas.fecha_inicio = DateTime.now().startOf('month').toISODate();
      fechas.fecha_fin = DateTime.now().endOf('month').toISODate();
      break;
    case 'Este año':
      fechas.fecha_inicio = DateTime.now().startOf('year').toISODate();
      fechas.fecha_fin = DateTime.now().endOf('year').toISODate();
      break;
    case 'Personalizado':
      fechas.fecha_inicio = DateTime.now().toISODate();
      fechas.fecha_fin = DateTime.now().toISODate();
      break;
    default:
      break;
  }
  return fechas;
}
