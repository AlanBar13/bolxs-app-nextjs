import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatPrice = (val = '') => `$ ` + Number(val);

export const numberWithCommas = (x = '') =>
  x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatPriceFixed = (val = '') =>
  `$ ` + numberWithCommas(Number(val).toFixed(2));

export const parsePrice = (val = '') => val.replace(/^\$/, '');

export const formatDate = (date = '') => {
  const d = new Date(date);
  return format(d, 'dd/MM/yyyy h:mm a');
};

export const formatDateSpanish = (date = '') => {
  const d = new Date(date);
  return format(d, 'dd MMMM yyyy - h:mm a', { locale: es });
};

export const formatDateDayTime = (date = '') => {
  const d = new Date(date);
  return format(d, 'EEEE h:mm a', { locale: es });
};

export const getDay = (date = '') => {
  const d = new Date(date);
  return format(d, 'dd', { locale: es });
};

export const getMonth = (date = '') => {
  const d = new Date(date);
  return format(d, 'MMM', { locale: es });
};
