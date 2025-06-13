// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcGnELPLBgfWaHjpXIu2Ru9CyIcfDtvQo",
  authDomain: "genai-at-ntu.firebaseapp.com",
  projectId: "genai-at-ntu",
  storageBucket: "genai-at-ntu.firebasestorage.app",
  messagingSenderId: "963446607770",
  appId: "1:963446607770:web:a42d8f7c40d444f243f423",
  measurementId: "G-RQLLN09GTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

const db = getFirestore(app);

export { db, analytics };