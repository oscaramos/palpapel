import React from 'react'
import { useState, createContext, useContext } from 'react'

const ErrorContext = createContext(undefined)

export function ErrorProvider({ children }) {
  const [message, setMessage] = useState(null)

  const throwError = message => {
    setMessage(message)
  }

  return (
    <ErrorContext.Provider value={ { message, throwError } }>
      { children }
    </ErrorContext.Provider>
  )
}

export function useError() {
  const context = useContext(ErrorContext)
  if (context === undefined) {
    throw new Error('ErrorContext must be within a ErrorProvider')
  }
  return context
}
