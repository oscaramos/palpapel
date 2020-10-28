import React from 'react'
import { Route, Switch } from 'wouter'

import { OrdersProvider } from './hooks/useOrders'

import Home from './pages/Home'
import Order from './pages/Order'
import Edit from './pages/Edit'
import Search from './pages/Search'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  return (
    <OrdersProvider>
      <Switch>
        <Route path='/' component={ Home } />
        <Route path='/order/:id' component={ Order } />
        <Route path='/edit/:id' component={ Edit } />
        <Route path='/search' component={ Search } />
        <Route path='/login' component={ Login } />
        <Route path='/register' component={ Register } />
      </Switch>
    </OrdersProvider>
  )
}

export default App
