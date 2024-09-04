// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpjWPRwxcdHnNEESDQOQd0M6cbUnykan4",
  authDomain: "comment-system-98ece.firebaseapp.com",
  projectId: "comment-system-98ece",
  storageBucket: "comment-system-98ece.appspot.com",
  messagingSenderId: "784513329431",
  appId: "1:784513329431:web:f3db07345411397f316f52",
  measurementId: "G-S1VGTT1F1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { db, auth, provider };
