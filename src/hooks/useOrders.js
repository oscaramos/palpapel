import React from 'react'
import { useState, createContext, useContext } from 'react'

const OrdersContext = createContext(undefined)

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([
    {
      id: 0,
      orderNumber: '000104',
      orderDate: new Date(),
      schoolName: 'Colegio de las rosas',
      schoolAddress: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
      schoolRUC: '20601888221',
      schoolTelephone: '211425',
      schoolCellphone: '921492405',
      responsableName: 'Bessie Cooper',
      responsablePosition: 'Teacher',
      responsableEmail: 'tim.jennings@example.com',
    },
    {
      id: 1,
      orderNumber: '000105',
      orderDate: new Date(),
      schoolName: 'Colegio de las rosas',
      schoolAddress: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
      schoolRUC: '20601888221',
      schoolTelephone: '211425',
      schoolCellphone: '921492405',
      responsableName: 'Bessie Cooper',
      responsablePosition: 'Teacher',
      responsableEmail: 'tim.jennings@example.com',
    },
    {
      id: 2,
      orderNumber: '000106',
      orderDate: new Date(),
      schoolName: 'Colegio de las rosas',
      schoolAddress: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
      schoolRUC: '20601888221',
      schoolTelephone: '211425',
      schoolCellphone: '921492405',
      responsableName: 'Bessie Cooper',
      responsablePosition: 'Teacher',
      responsableEmail: 'tim.jennings@example.com',
    },
  ])

  const getOrder = id => {
    id = Number(id)
    return orders.find(order => order.id === id)
  }

  const getAllOrders = () => {
    return orders
  }

  const editOrder = (id, newOrder) => {
    const ordersCopy = [...orders]
    ordersCopy[id] = { ...ordersCopy[id], ...newOrder }
    setOrders(ordersCopy)
  }

  const removeOrder = id => {
    const ordersCopy = [...orders]
    ordersCopy.splice(id, 1)
    setOrders(ordersCopy)
  }

  return (
    <OrdersContext.Provider value={ { getOrder, getAllOrders, editOrder, removeOrder } }>
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
