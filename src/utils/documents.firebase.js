import { auth, firestore } from "../firebase.utils"

export const createDocument = async () => {
  return await firestore.collection("orders").add({
    orderDate: new Date(),
    orderNumber: "000000",
    schoolName: "",
    schoolAddress: "",
    schoolDepartment: "",
    schoolProvince: "",
    schoolDistrict: "",
    schoolRUC: "",
    schoolTelephone: "",
    schoolCellphone: "",
    responsableName: "",
    responsablePosition: "",
    responsableEmail: "",
    uid: auth.currentUser.uid,
    inicialOrders: [
      {
        name: "",
        editorial: "",
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
    ],
    primariaOrders: [
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
        count6: 0,
      },
    ],
    secundariaOrders: [
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
      {
        name: "",
        editorial: "",
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        count5: 0,
      },
    ],
    otrosOrders: [
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
      {
        name: "",
        count: 0,
      },
    ],
  })
}

export const editDocument = async (id, data) => {
  const docRef = firestore.collection("orders").doc(id)
  await docRef.update(data)
}

export const deleteDocument = async (id) => {
  const docRef = firestore.collection("orders").doc(id)
  await docRef.delete()
}
