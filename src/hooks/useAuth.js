import React, { useRef } from "react"
import { createContext, useContext } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, firestore } from "../utils/firebase.utils"
import { useDocument } from "react-firebase-hooks/firestore"
import FullPageSpinner from "../components/FullPageSpinner"

const defaultData = {
  name: "",
}

const createUser = (uid, data) => {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ ...defaultData, ...data })
}

const updateUser = (uid) => {
  return firestore.collection("users").doc(uid).update(defaultData)
}

// arr1 - arr2
const difference = (arr1, arr2) => arr1.filter((x) => !arr2.includes(x))

const hasDifference = (arr1, arr2) => {
  return difference(arr1, arr2).length > 0
}

const AuthContext = createContext(undefined)

export function AuthProvider(props) {
  const userDataFromRegister = useRef({})

  const [user, loadingUser] = useAuthState(auth)
  const isSignedIn = !!user

  const [userDataSnap] = useDocument(
    isSignedIn ? firestore.collection("users").doc(user.uid) : undefined
  )

  const loadingUserDocument = !userDataSnap
  const userDocument = userDataSnap?.data()

  const userDocumentIsComplete =
    !loadingUserDocument &&
    userDocument &&
    !hasDifference(Object.keys(defaultData), Object.keys(userDocument))

  if (isSignedIn && !loadingUserDocument) {
    if (!userDataSnap.exists) {
      createUser(user.uid, userDataFromRegister.current)
    } else if (!userDocumentIsComplete) {
      updateUser(user.uid)
    }
  }

  const loading = loadingUser || (isSignedIn && (loadingUserDocument || !userDocumentIsComplete))

  if (loading) {
    return <FullPageSpinner />
  }

  const data = isSignedIn
    ? {
        ...userDocument,
        uid: user.uid,
      }
    : null

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const register = async (name, email, password) => {
    userDataFromRegister.current = {
      name,
    }
    return await auth.createUserWithEmailAndPassword(email, password)
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
