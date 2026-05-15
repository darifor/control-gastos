import { db } from "../lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";

const COLLECTION_NAME = "transactions";

export function subscribeToTransactions(callback) {
  const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(data);
  });
}

export async function getTransactions() {
  const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addTransaction(transaction) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...transaction,
    date: transaction.date || new Date().toISOString(),
    amount: Number(transaction.amount)
  });
  return docRef.id;
}

export async function deleteTransaction(id) {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
