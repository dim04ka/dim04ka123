// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWXJIzlaFjyqpvy6RdPuWAi_xXJc2Xh0Q",
  authDomain: "mara-b5982.firebaseapp.com",
  projectId: "mara-b5982",
  storageBucket: "mara-b5982.appspot.com",
  messagingSenderId: "1013568098588",
  appId: "1:1013568098588:web:3b6b5aa529c4779c01aad9",
  measurementId: "G-4ELYTHRVEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);