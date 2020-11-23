import useUser from "./useUser"
import { firestore } from "../utils/firebase.utils"

export const groupByValues = ["schoolName", "responsable", "displayDate"]

export const orderByValues = ["asc", "desc"]

export const defaultFilters = {
  groupBy: "schoolName",
  orderBy: "asc",
}

const spanishGroupBy = {
  schoolName: "Colegio",
  responsable: "Responsable",
  displayDate: "Fecha",
}

export function groupByToSpanish(groupBy) {
  return spanishGroupBy[groupBy]
}

function useFilters() {
  const { filters, uid } = useUser()

  if (!filters) {
    // Create new empty orders for user
    firestore.collection("users").doc(uid).update({ filters: defaultFilters })

    return defaultFilters
  }

  return filters
}

export default useFilters
