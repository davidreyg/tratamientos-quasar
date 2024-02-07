import { DateTime } from 'luxon';

export function useLuxonFormat() {
  const formatDate = (val: string) => {
    return DateTime.fromISO(val).toLocaleString(DateTime.DATE_MED);
  };

  const calcularEdad = (val: string) => {
    const birthdateTimeStamp = DateTime.fromISO(val).toMillis();
    const currentDate = new Date().getTime();
    const difference = currentDate - birthdateTimeStamp;
    const currentAge = Math.floor(difference / 31557600000);
    // dividing by 1000*60*60*24*365.25
    return currentAge;
  };
  return {
    formatDate,
    calcularEdad,
  };
}
