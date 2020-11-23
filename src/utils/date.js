import { format } from "date-fns"

export const toDisplayDate = (date) => {
  return format(date, "dd/MM/yyyy")
}
