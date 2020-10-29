import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'wouter'
import { OrdersProvider } from './hooks/useOrders'

import Home from './pages/Home'
import Order from './pages/Order'
import Edit from './pages/Edit'
import Search from './pages/Search'
import Login from './pages/Login'
import Register from './pages/Register'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { ErrorProvider, useError } from './hooks/useError'

function ErrorPopup() {
  const { message } = useError()
  const [errorSnack, setErrorSnack] = useState({
    open: false,
    message: ''
  })

  useEffect(() => {
    if (message) {
      setErrorSnack({
        open: true,
        message,
      })
    }
  }, [message])

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorSnack({ open: false, message: '' });
  };

  return (
    <Snackbar open={errorSnack.open} autoHideDuration={6000} onClose={handleCloseSnack}>
      <Alert elevation={6} variant="filled" severity="error">
        { errorSnack.message }
      </Alert>
    </Snackbar>
  )
}

function App() {
  return (
    <ErrorProvider>
      <OrdersProvider>
        <Switch>
          <Route path='/' component={ Home } />
          <Route path='/login' component={ Login } />
          <Route path='/register' component={ Register } />
          <Route path='/search' component={ Search } />
          <Route path='/order/:id' component={ Order } />
          <Route path='/edit/:id' component={ Edit } />
        </Switch>
      </OrdersProvider>
      <ErrorPopup />
    </ErrorProvider>
  )
}

export default App
