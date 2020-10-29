import React, { createContext, useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase.utils'

const OrdersContext = createContext(undefined)

export function OrdersProvider({ children }) {
  const [rawOrders, loading, error] = useCollectionData(
    firestore.collection('orders'),
    {
      idField: true,
    },
  )

  // Transform the order format in firebase to app format
  const orders = rawOrders?.map((order, index) => ({
    ...order,
    id: index,
    orderDate: order.orderDate.toDate(),
    firebaseId: order['true'] // ??
    // todo: displayDate
  }))

  const getOrder = id => orders?.find(order => String(order.id) === String(id))

  const editOrder = async (id, data) => {
    const firebaseData = getOrder(id)
    const docRef = firestore.collection('orders').doc(firebaseData.firebaseId)
    await docRef.update(data)
  }

  const deleteOrder = async (id) => {
    const firebaseData = getOrder(id)
    const docRef = firestore.collection('orders').doc(firebaseData.firebaseId)
    await docRef.delete()
  }

  return (
    <OrdersContext.Provider value={
      {
        getAllOrders: [orders, loading, error],
        getOrder: [getOrder, loading, error],
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
