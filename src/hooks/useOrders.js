import React, { createContext, useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase.utils'

const OrdersContext = createContext(undefined)

export function OrdersProvider({ children }) {
  const getOrder = id => {
    // id = Number(id)
    // return orders.find(order => order.id === id)
  }

  const editOrder = (id, newOrder) => {
    // const ordersCopy = [...orders]
    // ordersCopy[id] = { ...ordersCopy[id], ...newOrder }
    // setOrders(ordersCopy)
  }

  const removeOrder = id => {
    // const ordersCopy = [...orders]
    // ordersCopy.splice(id, 1)
    // setOrders(ordersCopy)
  }

  return (
    <OrdersContext.Provider value={ { getOrder, editOrder, removeOrder } }>
      { children }
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('OrdersContext must be within a OrdersProvider')
  }
  return context
}

const GetAllOrdersContext = createContext(undefined)

export function GetAllOrdersProvider({ children }) {
  const [rawOrders, loading, error] = useCollectionData(
    firestore.collection('orders'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  )

  // Transform the order format in firebase to app format
  const orders = rawOrders?.map((order, index) => ({
    ...order,
    id: index,
    orderDate: order.orderDate.toDate(),
  }))

  return (
    <GetAllOrdersContext.Provider value={ [orders, loading, error] }>
      { children }
    </GetAllOrdersContext.Provider>
  )
}

export function useGetAllOrders() {
  const context = useContext(GetAllOrdersContext)
  if (context === undefined) {
    throw new Error('GetAllOrdersContext must be within a GetAllOrdersProvider')
  }
  return context
}
