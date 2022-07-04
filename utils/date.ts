import { format, parseISO } from "date-fns"

const DATE_FORMAT = "dd/MM/yy"

const formatDate: (date: string) => string | null = date => {
  if (!date) return null
  return format(parseISO(date), DATE_FORMAT)
}

export { formatDate }
