// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCXdR4dxx9sz_ujiRdFgOlgR7mo2p1VOx8",
  authDomain: "farm-expert-d17fd.firebaseapp.com",
  projectId: "farm-expert-d17fd",
  storageBucket: "farm-expert-d17fd.appspot.com",
  messagingSenderId: "1005807067517",
  appId: "1:1005807067517:web:43b44bce64fc243a06ac14",
  measurementId: "G-BLF65CR6QW"
};

const app = initializeApp(firebaseConfig);
const storage=getStorage(app);
const db=getFirestore(app)

export {db,storage};