import React from "react"
import { ErrorProvider } from "./hooks/useError"
import { AuthProvider } from "./hooks/useAuth"
import { UserProvider } from "./hooks/useUser"

export function AppProviders({ children }) {
  return (
    <ErrorProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </ErrorProvider>
  )
}
