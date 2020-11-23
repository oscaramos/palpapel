import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const developmentFirebaseConfig = {
  apiKey: "AIzaSyDRRkL4bmPnreo8c6i-dNzGqMyDFDf3xII",
  authDomain: "control-order-online.firebaseapp.com",
  databaseURL: "https://control-order-online.firebaseio.com",
  projectId: "control-order-online",
  storageBucket: "control-order-online.appspot.com",
  messagingSenderId: "1036666023937",
  appId: "1:1036666023937:web:41a3fafbaa349d59491000",
}

const productionFirebaseConfig = {
  apiKey: "AIzaSyDvKgNi1ccnG-PJoMa_eFXxs34SaQT9nXo",
  authDomain: "palpapel.firebaseapp.com",
  databaseURL: "https://palpapel.firebaseio.com",
  projectId: "palpapel",
  storageBucket: "palpapel.appspot.com",
  messagingSenderId: "89198193091",
  appId: "1:89198193091:web:d3d2ffcba794718720b576",
}

// Initialize Firebase
firebase.initializeApp(productionFirebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
