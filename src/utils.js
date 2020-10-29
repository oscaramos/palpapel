import { format, parse } from 'date-fns'

export const toDDMMYYYY = date => {
  return format(date, 'dd/MM/yyyy')
}

export const fromDDMMYYYY = date => {
  return parse(date, 'dd/MM/yyyy', new Date())
}
