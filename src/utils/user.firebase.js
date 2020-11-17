import { auth, firestore } from "../firebase.utils"

export async function updateUser(data) {
  const userRef = firestore.collection("users").doc(auth.currentUser.uid)
  await userRef.update(data)
}

export async function editUserDataFilters(filters) {
  await updateUser({ filters })
}
