import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { format } from "date-fns"

import { auth, firestore } from "../firebase.utils"
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore"

const fromFirestoreDocument = (document) => ({
  ...document,
  orderDate: document.orderDate.toDate(),
  orderDisplayDate: format(document.orderDate.toDate(), "dd/MM/yyyy"),
})

export function useGetAllDocuments() {
  const [user] = useAuthState(auth)

  const [rawDocuments, loading, error] = useCollectionData(
    firestore
      .collection("orders")
      .orderBy("orderNumber")
      .where("uid", "==", user?.uid ?? null),
    {
      idField: "id",
    }
  )

  const documents = rawDocuments?.map(fromFirestoreDocument)

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
