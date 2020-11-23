import { useDocumentData } from "react-firebase-hooks/firestore"

import useUser from "./useUser"
import { defaultFilters, groupByValues, orderByValues } from "./useFilters"

import { firestore } from "../utils/firebase.utils"
import { toDisplayDate } from "../utils/date"

const fromFirestoreUserDocument = (document) => ({
  ...document,
  date: document.date.toDate(),
  displayDate: toDisplayDate(document.date.toDate()),
})

const fromFirestoreDocument = (document) => ({
  ...document,
  orderDate: document.orderDate.toDate(),
  orderDisplayDate: toDisplayDate(document.orderDate.toDate()),
})

export function useGetAllDocuments() {
  const { orders, uid } = useUser()

  if (!orders) {
    // Create new empty orders for user
    firestore.collection("users").doc(uid).update({ orders: {} })
    return []
  }

  // convert each order from firestore format to internal format + add it it's id
  return Object.entries(orders).map(([id, order]) => ({
    ...fromFirestoreUserDocument(order),
    id,
  }))
}

export function useGetDocument(id) {
  const [rawDocument, loading, error] = useDocumentData(firestore.collection("orders").doc(id), {
    idField: "id",
  })

  const data = rawDocument ? fromFirestoreDocument(rawDocument) : null

  return [data, loading, error]
}

const groupByKey = (xs, key) =>
  xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

const object2KeyValueArray = (obj, keyName, valueName) =>
  Object.entries(obj).map(([key, value]) => ({ [keyName]: key, [valueName]: value }))

const toNumber = (value, defaultValue = 0) => (!isNaN(value) ? value : defaultValue)

export function useGetGroupedDocuments(filters) {
  const documents = useGetAllDocuments()

  const { groupBy = defaultFilters.groupBy, orderBy = defaultFilters.orderBy } = filters
  if (!groupByValues.includes(groupBy)) {
    throw new Error("El parámetro groupByKey es invalido")
  }
  if (!orderByValues.includes(orderBy)) {
    throw new Error("El parámetro orderBy es invalido")
  }

  // grouping the documents
  const groupedDocuments = object2KeyValueArray(groupByKey(documents, groupBy), "title", "data")

  // sorting the document groups
  groupedDocuments.sort((a, b) => b.title.localeCompare(a.title))

  // if descendent order, reverse groups
  if (orderBy === "desc") groupedDocuments.reverse()

  // sorting the individual documents
  groupedDocuments.forEach((group) =>
    group.data.sort((a, b) => toNumber(b.number) - toNumber(a.number))
  )

  return groupedDocuments
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
//   const groups = groupByKey(data, "uid")
//   const userOrders = orders2userOrderGroups(groups)
//   console.log(userOrders)
//   // userOrders.forEach((order) =>
//   //   firestore
//   //     .collection("users")
//   //     .doc(order.uid)
//   //     .set({ filters: { groupByKey: "schoolName", orderBy: "des" }, orders: order.orders })
//   // )
//
//   return []
// }
