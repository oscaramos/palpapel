import React, { createContext, useContext } from "react"
import { useAuth } from "./useAuth"

const UserDataContext = createContext(undefined)

export function UserProvider(props) {
  const { data } = useAuth()

  return <UserDataContext.Provider value={data} {...props} />
}

export function useUser() {
  const context = useContext(UserDataContext)
  if (context === undefined) {
    throw new Error("UserDataContext must be within a UserProvider")
  }
  return context
}

export default useUser
