import React, { createContext, useContext } from "react"

import { useAuthState } from "react-firebase-hooks/auth"
import { useDocument } from "react-firebase-hooks/firestore"
import { auth, firestore } from "../firebase.utils"

const UserDataContext = createContext(undefined)

export function UserDataProvider({ children }) {
  const [user] = useAuthState(auth)
  const uid = user?.uid

  const [userDataSnap, loading, error] = useDocument(
    uid ? firestore.collection("users").doc(uid) : undefined,
    {
      idField: "id",
    }
  )

  if (userDataSnap && !userDataSnap.exists) {
    firestore.collection("users").doc(uid).set({})
  }

  return (
    <UserDataContext.Provider value={[userDataSnap?.data(), loading, error]}>
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
