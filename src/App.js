import React from 'react'
import { Route, Switch } from 'wouter'

import Home from './pages/Home'
import Order from './pages/Order'
import Edit from './pages/Edit'
import Search from './pages/Search'

import { OrdersProvider } from './hooks/useOrders'

function App() {
  return (
    <OrdersProvider>
      <Switch>
        <Route path='/' component={ Home } />
        <Route path='/order/:id' component={ Order } />
        <Route path='/edit' component={ Edit } />
        <Route path='/search' component={ Search } />
      </Switch>
    </OrdersProvider>
  )
}

export default App
