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
  const fecha = DateTime.local().setLocale('es-PE');
  switch (rango) {
    case 'Hoy':
      fechas.fecha_inicio = fecha.toISODate();
      fechas.fecha_fin = fecha.toISODate();
      break;
    case 'Esta semana':
      fechas.fecha_inicio = fecha
        .startOf('week', { useLocaleWeeks: true })
        .toISODate();
      fechas.fecha_fin = fecha
        .endOf('week', { useLocaleWeeks: true })
        .toISODate();
      break;
    case 'Este mes':
      fechas.fecha_inicio = fecha
        .startOf('month', { useLocaleWeeks: true })
        .toISODate();
      fechas.fecha_fin = fecha
        .endOf('month', { useLocaleWeeks: true })
        .toISODate();
      break;
    case 'Este año':
      fechas.fecha_inicio = fecha
        .startOf('year', { useLocaleWeeks: true })
        .toISODate();
      fechas.fecha_fin = fecha
        .endOf('year', { useLocaleWeeks: true })
        .toISODate();
      break;
    case 'Personalizado':
      fechas.fecha_inicio = fecha.toISODate();
      fechas.fecha_fin = fecha.toISODate();
      break;
    default:
      break;
  }
  return fechas;
}
