import { format } from "date-fns"
import { useDocumentData } from "react-firebase-hooks/firestore"

import { auth, firestore } from "../firebase.utils"
import useUserData from "./useUserData"
import { defaultFilters, groupByValues, orderByValues } from "./useFilters"

const fromFirestoreUserDocument = (document) => ({
  ...document,
  date: document.date.toDate(),
  displayDate: format(document.date.toDate(), "dd/MM/yyyy"),
})

const fromFirestoreDocument = (document) => ({
  ...document,
  orderDate: document.orderDate.toDate(),
  orderDisplayDate: format(document.orderDate.toDate(), "dd/MM/yyyy"),
})

export function useGetAllDocuments() {
  const [userData, loading, error] = useUserData()

  if (!userData) return [null, loading, error]

  const orders = userData?.orders

  if (userData && !orders) {
    // Create new empty orders for user
    firestore.collection("users").doc(auth.currentUser.uid).update({ orders: {} })
    return [null, loading, error]
  }

  // convert each order from firestore format to internal format + add it it's id
  const documents = Object.entries(orders).map(([id, order]) => ({
    ...fromFirestoreUserDocument(order),
    id,
  }))

  return [documents, loading, error]
}

export function useGetDocument(id) {
  const [rawDocument, loading, error] = useDocumentData(
    firestore.collection("orders").doc(id || " "),
    {
      idField: "id",
    }
  )

  const data = rawDocument ? fromFirestoreDocument(rawDocument) : null

  return [data, loading, error]
}

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

const object2KeyValueArray = (obj, keyName, valueName) =>
  Object.entries(obj).map(([key, value]) => ({ [keyName]: key, [valueName]: value }))

const toNumber = (value, defaultValue = 0) => (!isNaN(value) ? value : defaultValue)

export function useGetGroupedDocuments(filters) {
  const [documents, loading, error] = useGetAllDocuments()

  // validation
  if (!filters) return [null, true, null]

  const { groupBy: groupByKey = defaultFilters.groupBy, orderBy = defaultFilters.orderBy } = filters
  if (!groupByValues.includes(groupByKey)) {
    return [null, false, { message: "El parámetro groupBy es invalido" }]
  }
  if (!orderByValues.includes(orderBy)) {
    return [null, false, { message: "El parámetro orderBy es invalido" }]
  }
  if (!documents) return [null, loading, error]
  if (!groupByKey || !orderBy) return [null, loading, error]

  // grouping the documents
  const groupedDocuments = object2KeyValueArray(groupBy(documents, groupByKey), "title", "data")

  // sorting the document groups
  groupedDocuments.sort((a, b) => b.title.localeCompare(a.title))

  // if not ascendant order, then its descendent
  if (orderBy !== "asc") groupedDocuments.reverse()

  // sorting the individual documents
  groupedDocuments.forEach((group) =>
    group.data.sort((a, b) => toNumber(b.number) - toNumber(a.number))
  )

  return [groupedDocuments, loading, error]
}

// *** MIGRATION ***
// Copy all data in firestore /orders/ to /users/{uid}
//
// const order2userOrder = (order) => ({
//   schoolName: order.schoolName,
//   date: order.orderDate,
//   id: order.id,
//   number: order.orderNumber,
//   responsable: order.responsableName,
// })
//
// const arrWithIds2object = (arr) => arr.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {})
//
// const removeIds = (obj) =>
//   Object.keys(obj).reduce((acc, key) => {
//     const { id, ...rest } = obj[key]
//     acc[key] = rest
//     return acc
//   }, {})
//
// const orders2userOrderGroups = (orders) =>
//   Object.entries(orders).map(([uid, orders]) => ({
//     uid,
//     orders: removeIds(arrWithIds2object(orders.map((order) => order2userOrder(order)))),
//   }))
//
// export function useMigration() {
//   console.log("migration")
//   const [rawOrders, loading, error] = useCollectionDataOnce(firestore.collection("orders"), {
//     idField: "id",
//   })
//
//   const data = rawOrders?.map((order) => fromFirestoreDocument(order))
//   if (!data) return []
//   const groups = groupBy(data, "uid")
//   const userOrders = orders2userOrderGroups(groups)
//   console.log(userOrders)
//   // userOrders.forEach((order) =>
//   //   firestore
//   //     .collection("users")
//   //     .doc(order.uid)
//   //     .set({ filters: { groupBy: "schoolName", orderBy: "des" }, orders: order.orders })
//   // )
//
//   return []
// }
