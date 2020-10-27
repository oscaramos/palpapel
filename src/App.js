import React from 'react'
import { ThemeProvider } from 'styled-components'

import { darkTheme, lightTheme } from './themes'
import { GlobalStyles } from './globalStyles'

import { useDarkMode } from './hooks/useDarkMode'
import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import Order from './pages/Order'

function App() {
  const [theme] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/order' component={Order} />
      </Switch>
    </ThemeProvider>
  );
}

export default App
