import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFK-JCo-TwyD8wtvuxK9XBhOWRcw7K1xw",
  authDomain: "marsmobileservices.firebaseapp.com",
  projectId: "marsmobileservices",
  storageBucket: "marsmobileservices.firebasestorage.app",
  messagingSenderId: "187685450627",
  appId: "1:187685450627:web:0056af1b087dcc8348bcb6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc
};