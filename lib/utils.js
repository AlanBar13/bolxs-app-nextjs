import { format } from 'date-fns';

export const formatPrice = (val = "") => `$ ` + Number(val)

export const numberWithCommas = (x = "") => x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const formatPriceFixed = (val = "") => `$ ` + numberWithCommas(Number(val).toFixed(2));

export const parsePrice = (val = "") => val.replace(/^\$/, '')

export const formatDate = (date = "") => {
    const d = new Date(date);
    return format(d, 'dd/MM/yyyy h:mm a');
};