import React from 'react'
import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import Order from './pages/Order'

function App() {
  return (
    <Switch>
      <Route path='/' component={ Home } />
      <Route path='/order' component={ Order } />
    </Switch>
  )
}

export default App
