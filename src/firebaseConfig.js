import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCaM9HpN4F4vqQH8AJEo-YcJwI3_Zju2fw",
  authDomain: "positiveparenting-stckh.firebaseapp.com",
  databaseURL: "https://positiveparenting-stckh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "positiveparenting-stckh",
  storageBucket: "positiveparenting-stckh.appspot.com",
  messagingSenderId: "631288969759",
  appId: "1:631288969759:web:8cb219eb352ee19392b32a",
  measurementId: "G-27BPXHQQV5"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app)
export { app, storage, db,  auth };
export default app