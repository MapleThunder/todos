import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAlzWR3t2M66qh7MOazd2Gxs1QyylOmxQg",
  authDomain: "todos-cabec.firebaseapp.com",
  databaseURL: "https://todos-cabec.firebaseio.com",
  projectId: "todos-cabec",
  storageBucket: "todos-cabec.appspot.com",
  messagingSenderId: "923031199611",
  appId: "1:923031199611:web:5249f9024bda98df30a7de"
});

export { firebaseConfig as firebase };