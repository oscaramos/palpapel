import useUserData from "./useUserData"
import { auth, firestore } from "../firebase.utils"

export const groupByValues = ["schoolName", "responsable", "displayDate", null]

export const orderByValues = ["asc", "desc", null]

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
  const [userData, loading, error] = useUserData()

  const filters = userData?.filters

  if (userData && !filters) {
    // Create new empty orders for user
    firestore.collection("users").doc(auth.currentUser.uid).update({ filters: defaultFilters })

    return [defaultFilters, loading, error]
  }

  return [filters, loading, error]
}

export default useFilters
