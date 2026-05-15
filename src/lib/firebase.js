import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTZbYc7w8a3MfI_sRoIVSkyk34yF6zdzs",
  authDomain: "control-gastos-c7dad.firebaseapp.com",
  projectId: "control-gastos-c7dad",
  storageBucket: "control-gastos-c7dad.firebasestorage.app",
  messagingSenderId: "1043939842448",
  appId: "1:1043939842448:web:8b735cbf663ab0c7ba3b15"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
