// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAzWlqugwFw1WYv0ysrgQpeeUVP7dcRb8",
  authDomain: "good-old-deals.firebaseapp.com",
  projectId: "good-old-deals",
  storageBucket: "good-old-deals.appspot.com",
  messagingSenderId: "126380693702",
  appId: "1:126380693702:web:b4bc5e5c00251518dddfc7"
};

// Initialize Firebase
// export const FIREBASE_APP = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
//export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);

