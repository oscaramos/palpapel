import { auth, firestore } from "../firebase.utils"

export async function editUserDataFilters(filters) {
  const docRef = firestore.collection("users").doc(auth.currentUser.uid)
  await docRef.update({ filters })
}
