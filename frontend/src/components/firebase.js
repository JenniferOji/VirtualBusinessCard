// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZWAjEbEJqmzLQ5-xqyeaqqlf2KHT7XYE",
  authDomain: "virtualbusinesscard-ebaa1.firebaseapp.com",
  projectId: "virtualbusinesscard-ebaa1",
  storageBucket: "virtualbusinesscard-ebaa1.firebasestorage.app",
  messagingSenderId: "664225877243",
  appId: "1:664225877243:web:b5aff77433b07098e3f45e",
  measurementId: "G-HYM4VSYBDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
