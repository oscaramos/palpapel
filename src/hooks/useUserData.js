import React, { createContext, useContext } from "react"

import { useAuthState } from "react-firebase-hooks/auth"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { auth, firestore } from "../firebase.utils"

const UserDataContext = createContext(undefined)

export function UserDataProvider({ children }) {
  const [user] = useAuthState(auth)

  const [userData, loading, error] = useDocumentData(
    user?.uid ? firestore.collection("users").doc(user.uid) : undefined,
    {
      idField: "id",
    }
  )

  return (
    <UserDataContext.Provider value={[userData, loading || !userData, error]}>
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData() {
  const context = useContext(UserDataContext)
  if (context === undefined) {
    throw new Error("UserDataContext must be within a UserDataProvider")
  }
  return context
}

export default useUserData
