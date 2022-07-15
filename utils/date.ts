import { format, parseISO } from "date-fns";

const DATE_FORMAT = "dd/MM/yy - H:m";

const formatDate: (date: string) => string | null = (date) => {
  if (!date) return null;
  return format(parseISO(date), DATE_FORMAT);
};

const DATE_FORMAT_WITHOUT_YEARS = "dd/MM";

const formatDateWithoutYears: (date: string) => string | null = (date) => {
  if (!date) return null;
  return format(parseISO(date), DATE_FORMAT_WITHOUT_YEARS);
};

export { formatDate, formatDateWithoutYears };
