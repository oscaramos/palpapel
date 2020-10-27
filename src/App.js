import React from 'react'
import { Route, Switch } from 'wouter'

import Home from './pages/Home'
import Order from './pages/Order'
import Edit from './pages/Edit'

function App() {
  return (
    <Switch>
      <Route path='/' component={ Home } />
      <Route path='/order' component={ Order } />
      <Route path='/edit' component={ Edit } />
    </Switch>
  )
}

export default App
