import admin from "firebase/app"
import { auth, firestore } from "./firebase.utils"

export const defaultDocumentValues = {
  orderDate: new Date(),
  orderNumber: "000000",

  schoolName: "",
  schoolRUC: "",
  schoolDirector: "",
  schoolTelephone: "",
  schoolAddress: "",
  schoolDepartment: "",
  schoolProvince: "",
  schoolDistrict: "",

  responsableName: "",
  responsableEmail: "",
  salesMethod: "venta_directa",

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
  ],
}

export const createDocument = async () => {
  return await firestore.collection("orders").add({
    uid: auth.currentUser.uid,
    ...defaultDocumentValues,
  })
}

const order2UserOrder = (order) => ({
  schoolName: order.schoolName,
  date: order.orderDate,
  number: order.orderNumber,
  responsable: order.responsableName,
})

/**
 * Update the document on the orders collection and also creates an entry to the user's personal documents
 * @param id
 * @param data
 * @return {Promise<void>}
 */
export const updateDocument = async (id, data) => {
  // batch to keep the whole operation atomic
  const batch = firestore.batch()

  const docRef = firestore.collection("orders").doc(id)
  await batch.update(docRef, data)

  const updatedOrders = {}
  updatedOrders[`orders.${id}`] = order2UserOrder(data)

  const userRef = firestore.collection("users").doc(auth.currentUser.uid)
  await batch.update(userRef, updatedOrders)

  await batch.commit()
}

/**
 * Deletes the document on the orders collection and also deletes their correspondent entry on the user's personal documents
 * @param id
 * @return {Promise<void>}
 */
export const deleteDocument = async (id) => {
  // batch to keep the whole operation atomic
  const batch = firestore.batch()

  const docRef = firestore.collection("orders").doc(id)
  await batch.delete(docRef)

  const orderToDelete = {}
  orderToDelete[`orders.${id}`] = admin.firestore.FieldValue.delete()

  const userRef = firestore.collection("users").doc(auth.currentUser.uid)
  await batch.update(userRef, orderToDelete)

  await batch.commit()
}
