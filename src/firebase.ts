// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import { storage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyCtlINREAlJH34DAIbGFc0pgNS1vL3svTE",

    authDomain: "blog-f4cda.firebaseapp.com",
  
    projectId: "blog-f4cda",
  
    storageBucket: "blog-f4cda.appspot.com",
  
    messagingSenderId: "605232530796",
  
    appId: "1:605232530796:web:a7cbb3853907ca6d13df49",
  
    measurementId: "G-8YFZV1BQGF"
  
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { signInWithEmailAndPassword };
export const storage = getStorage(app);
export { db };
