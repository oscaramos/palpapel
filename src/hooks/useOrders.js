import React, { createContext, useCallback, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { format } from "date-fns";

import { auth, firestore } from "../firebase.utils";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

/*-- Firebase utils functions --*/
const createOrder = async () => {
  return await firestore.collection("orders").add({
    orderDate: new Date(),
    orderNumber: "010",
    schoolName: "School",
    schoolAddress: "Address",
    schoolRUC: "123",
    schoolTelephone: "123",
    schoolCellphone: "123",
    responsableName: "Irresponsable",
    responsablePosition: "Nop",
    responsableEmail: "haha",
    uid: auth.currentUser.uid,
  });
};

const getOrder = async (id) => {
  const docRef = firestore.collection("orders").doc(id);
  const doc = await docRef.get();
  return doc.data();
};

const editOrder = async (id, data) => {
  const docRef = firestore.collection("orders").doc(id);
  await docRef.update(data);
};

const deleteOrder = async (id) => {
  const docRef = firestore.collection("orders").doc(id);
  await docRef.delete();
};

/*-- useOrders hook --*/
const OrdersContext = createContext(undefined);

const fromFirestoreDocument = (order) => ({
  ...order,
  orderDate: order.orderDate.toDate(),
  orderDisplayDate: format(order.orderDate.toDate(), "dd/MM/yyyy"),
});

function useGetAllOrders() {
  const [user] = useAuthState(auth);

  const [rawOrders, loading, error] = useCollectionData(
    firestore
      .collection("orders")
      .orderBy("orderNumber")
      .where("uid", "==", user?.uid ?? null),
    {
      idField: "id",
    }
  );

  const orders = rawOrders?.map(fromFirestoreDocument);

  return [orders, loading, error];
}

function useGetOrder() {
  const [orderId, setOrderId] = useState("");
  const [rawOrder, loading, error] = useDocumentData(
    firestore.collection("orders").doc(orderId || " "),
    {
      idField: "id",
    }
  );

  const order = rawOrder ? fromFirestoreDocument(rawOrder) : null;

  const getOrderWrapper = useCallback(
    async (id) => {
      setOrderId(id);
      return await getOrder(id);
    },
    [setOrderId]
  );

  return [getOrderWrapper, order, loading, error];
}

export function OrdersProvider({ children }) {
  return (
    <OrdersContext.Provider
      value={{
        getAllOrders: useGetAllOrders(),
        getOrder: useGetOrder(),
        createOrder,
        editOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be within a OrdersProvider");
  }
  return context;
}
