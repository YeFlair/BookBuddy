import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmOtP3jUD46veJqgz8ntyXVSO6QShtDuo",
    authDomain: "bookbuddy-384004.firebaseapp.com",
    projectId: "bookbuddy-384004",
    storageBucket: "bookbuddy-384004.appspot.com",
    messagingSenderId: "1021194661248",
    appId: "1:1021194661248:web:3ceca45eb7112a3495e565",
    measurementId: "G-E78M0X9BHH"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

