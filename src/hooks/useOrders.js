import React, { createContext, useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { format } from 'date-fns'

import useFirestoreLoadMore from './useFirestoreLoadMore'
import { auth, firestore } from '../firebase.utils'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'

const OrdersContext = createContext(undefined)

const fromFirestoreDocument = order => ({
  ...order,
  orderDate: order.orderDate.toDate(),
  orderDisplayDate: format(order.orderDate.toDate(), 'dd/MM/yyyy'),
})

function useGetAllOrders() {
  const [user] = useAuthState(auth)

  const [rawOrders, loading, error] = useCollectionData(
    firestore
      .collection('orders')
      .orderBy('orderNumber')
      .where('uid', '==', user?.uid ?? null),
    {
      idField: 'id'
    }
  )

  const orders = rawOrders?.map(fromFirestoreDocument)

  return [orders, loading, error]
}

function useGetPaginatedOrders() {
  const [user] = useAuthState(auth)

  const queryFn = React.useCallback(() => {
    let q = firestore
      .collection('orders')
      .orderBy('orderNumber')
      .limit(3)

    if (user) {
      q = q.where('uid', '==', user?.uid ?? null)
    }

    return q
  }, [user])

  const [[rawOrders, loading, error], loadMore, loadAgain] = useFirestoreLoadMore(queryFn)

  // Transform the order format in firebase to app format
  const orders = rawOrders
    // Convert snapshot to documents with id
    ?.map(doc => ({ id: doc.id, ...doc.data() }))
    .map(fromFirestoreDocument)

  return [orders, loading, error, loadMore, loadAgain]
}

function useGetOrder() {
  const [orderId, setOrderId] = useState('')
  const [rawOrder, loading, error] = useDocumentData(
    firestore.collection('orders').doc(orderId ||  ' '),
    {
      idField: 'id'
    }
  )

  const order = rawOrder? fromFirestoreDocument(
    rawOrder
  ): null


  const getOrder = id => {
    setOrderId(id)
  }

  return [getOrder, order, loading, error]
}

export function OrdersProvider({ children }) {
  const [orders, loading, error, loadMore, loadAgain] = useGetPaginatedOrders()

  const createOrder = async () => {
    const res = await firestore.collection('orders').add({
      orderDate: new Date(),
      orderNumber: "010",
      schoolName: "School",
      schoolAddress: "Address",
      schoolRUC: "123",
      schoolTelephone: "123",
      schoolCellphone: "123",
      responsableName: "Irresponsable",
      responsablePosition: "Nop",
      responsableEmail: "haha",
      uid: auth.currentUser
    })

    loadAgain()

    return res
  }

  const editOrder = async (id, data) => {
    const docRef = firestore.collection('orders').doc(id)
    await docRef.update(data)
    loadAgain()
  }

  const deleteOrder = async (id) => {
    const docRef = firestore.collection('orders').doc(id)
    await docRef.delete()
    loadAgain()
  }

  return (
    <OrdersContext.Provider value={
      {
        getAllOrders: useGetAllOrders(),
        getPaginatedOrders: [orders, loading, error, loadMore],
        getOrder: useGetOrder(),
        createOrder,
        editOrder,
        deleteOrder
      }
    }>
      { children }
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be within a OrdersProvider')
  }
  return context
}
