import { DateTime } from 'luxon';

export function useLuxonFormat() {
  const formatDate = (val: string) => {
    return DateTime.fromISO(val).toLocaleString(DateTime.DATE_MED);
  };
  return {
    formatDate,
  };
}
