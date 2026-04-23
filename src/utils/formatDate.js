import { format, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';

const parseDate = date => parseISO(date);

// 1. return 2026
export const getYear = date => {
  return format(parseDate(date), 'yyyy');
};

// 2. return 15/04/2026
export const getNumericDate = date => {
  return format(parseDate(date), 'dd/MM/yyyy');
};

// 3. return 15 Апреля 2026
export const getPrettyDate = date => {
  const result = format(parseDate(date), 'd MMMM yyyy', { locale: uk });
  return result.replace(/^(\d+\s)(.)/, (_, p1, p2) => p1 + p2.toUpperCase());
};
