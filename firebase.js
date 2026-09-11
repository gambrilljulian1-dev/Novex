import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9bdmySM1o8IXi98RSC4945cfVLOtSI78",
  authDomain: "novex-f5b39.firebaseapp.com",
  projectId: "novex-f5b39",
  storageBucket: "novex-f5b39.firebasestorage.app",
  messagingSenderId: "1094948658052",
  appId: "1:1094948658052:web:220310bb443f8c8538dbd1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
