import React, { createContext, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { format } from 'date-fns'

import useFirestoreLoadMore from './useFirestoreLoadMore'
import { firestore, auth } from '../firebase.utils'

const OrdersContext = createContext(undefined)

export function OrdersProvider({ children }) {
  const [user] = useAuthState(auth)

  const queryFn = React.useCallback(() => {
    let q = firestore
      .collection('orders')
      .orderBy('orderNumber')
      .limit(5)

    if (user) {
      q = q.where('uid', '==', user?.uid ?? null)
    }

    return q
  }, [user])

  const [[rawOrders, loading, error], loadMore] = useFirestoreLoadMore(queryFn)

  // Transform the order format in firebase to app format
  const orders = rawOrders
    // Convert snapshot to documents with id
    ?.map(doc => ({ id: doc.id, ...doc.data() }))
    // Used as internal state
    .map(order => ({
      ...order,
      orderDate: order.orderDate.toDate(),
      orderDisplayDate: format(order.orderDate.toDate(), 'dd/MM/yyyy'),
    }))

  const getOrder = id => orders?.find(order => String(order.id) === String(id))

  const createOrder = async () => {
    return await firestore.collection('orders').add({
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
      uid: user.uid
    })
  }

  const editOrder = async (id, data) => {
    const firebaseData = getOrder(id)
    const docRef = firestore.collection('orders').doc(firebaseData.id)
    await docRef.update(data)
  }

  const deleteOrder = async (id) => {
    const firebaseData = getOrder(id)
    const docRef = firestore.collection('orders').doc(firebaseData.id)
    await docRef.delete()
  }

  return (
    <OrdersContext.Provider value={
      {
        getAllOrders: [orders, loading, error, loadMore],
        getOrder: [getOrder, loading, error],
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
