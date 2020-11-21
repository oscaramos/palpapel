import React from "react"
import { createContext, useContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, firestore } from "../firebase.utils"
import { useDocument } from "react-firebase-hooks/firestore"
import FullPageSpinner from "../components/FullPageSpinner"

const AuthContext = createContext(undefined)

export function AuthProvider(props) {
  const [user, loadingUser] = useAuthState(auth)
  const isSignedIn = !!user

  const [userDataSnap] = useDocument(
    isSignedIn ? firestore.collection("users").doc(user.uid) : undefined
  )

  const loadingUserDocument = !userDataSnap

  const userWithoutDocument = isSignedIn && !loadingUserDocument && !userDataSnap.exists

  if (userWithoutDocument) {
    firestore.collection("users").doc(user.uid).set({})
  }

  const loading = loadingUser || (isSignedIn && (loadingUserDocument || userWithoutDocument))

  if (loading) {
    return <FullPageSpinner />
  }

  const data = isSignedIn
    ? {
        ...userDataSnap.data(),
        uid: user.uid,
      }
    : null

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  return <AuthContext.Provider value={{ data, login, logout, register }} {...props} />
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("AuthContext must be within a AuthProvider")
  }
  return context
}
