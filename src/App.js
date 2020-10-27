import React from 'react'
import { Route, Switch } from 'wouter'

import Home from './pages/Home'
import Order from './pages/Order'
import Edit from './pages/Edit'
import Search from './pages/Search'

function App() {
  return (
    <Switch>
      <Route path='/' component={ Home } />
      <Route path='/order' component={ Order } />
      <Route path='/edit' component={ Edit } />
      <Route path='/search' component={ Search } />
    </Switch>
  )
}

export default App
