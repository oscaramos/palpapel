import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRRkL4bmPnreo8c6i-dNzGqMyDFDf3xII",
  authDomain: "control-order-online.firebaseapp.com",
  databaseURL: "https://control-order-online.firebaseio.com",
  projectId: "control-order-online",
  storageBucket: "control-order-online.appspot.com",
  messagingSenderId: "1036666023937",
  appId: "1:1036666023937:web:41a3fafbaa349d59491000",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
