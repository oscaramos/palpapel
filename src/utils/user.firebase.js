import { firestore } from "./firebase.utils"

export async function editUserDataFilters(uid, filters) {
  const userRef = firestore.collection("users").doc(uid)
  await userRef.update({ filters })
}
