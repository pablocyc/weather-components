import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { FIREBASE } from "./config.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";

const app = initializeApp(FIREBASE.firebaseConfig);
const db = getFirestore(app);
const station = "sensors";

// Create
export const saveTask = (title, description) =>
  addDoc(collection(db, station), { title, description });

// Read
export const getTasks = () => getDocs(collection(db, station));
export const getTask = id => getDoc(doc(db, station, id));
export const onGetTasks = callback => onSnapshot(collection(db, station), callback);

// Update
export const updateTask = (id, newFields) => {
  updateDoc(doc(db, station, id), newFields);
};

// Delete
export const deleteTask = id => deleteDoc(doc(db, station, id));
