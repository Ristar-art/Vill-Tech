// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, push, onValue, set } from "firebase/database";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
    // apiKey: "AIzaSyDW2Sftdkj0H0Wu4LyWV6kiIoK3INY59M4",
    // authDomain: "sowheretoaccessv2.firebaseapp.com",
    // projectId: "sowheretoaccessv2",
    // storageBucket: "sowheretoaccessv2.appspot.com",
    // messagingSenderId: "619059671255",
    // appId: "1:619059671255:web:48c8f8ed1c4c2d8bf90092",
    // measurementId: "G-ZEDNXZXE8Y"
};

// Initialize Firebase
let firebaseApp
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
}
else {
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig)
    
}

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
const database = getDatabase(firebaseApp);

export { database, ref, push, onValue, set };