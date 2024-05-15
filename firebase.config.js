// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLHCsOUUjXmnbJ1uXyYJ484E3UA3XNvPw",
    authDomain: "coffeechat-4cce3.firebaseapp.com",
    projectId: "coffeechat-4cce3",
    storageBucket: "coffeechat-4cce3.appspot.com",
    messagingSenderId: "361213669924",
    appId: "1:361213669924:web:febb64bbd8aa169c9f1eb1",
    measurementId: "G-SKT4505S7Q"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);
if (process.env.NEXT_PUBLIC_ENV === "dev") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectStorageEmulator(storage, "localhost", 9199);
    connectFunctionsEmulator(functions, "localhost", 5001);
    connectFirestoreEmulator(db, "localhost", 8080);
}

export { db, auth, storage, functions, app };
