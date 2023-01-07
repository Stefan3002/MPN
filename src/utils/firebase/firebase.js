// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {signInWithPopup, getAuth, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth'
import {doc, setDoc, getDoc, getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVdG_omezmXAfHXKlgKjx5zwXZPcofn9c",
    authDomain: "mpnotebook-90f53.firebaseapp.com",
    projectId: "mpnotebook-90f53",
    storageBucket: "mpnotebook-90f53.appspot.com",
    messagingSenderId: "371451432478",
    appId: "1:371451432478:web:14331874b846519edb680f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const db = getFirestore()
export const googleAuthBack = async () => await signInWithPopup(auth, googleProvider)

export const createUserDocBack = async (userData) => {
    const {uid, email, photoURL, displayName} = userData.user
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)
    const createdAt = new Date()
    if(userSnap.exists())
        return userSnap
    else {
        await setDoc(userRef, {
            displayName,
            email,
            photoURL,
            createdAt
        })
        return userSnap
    }
}
export const getUserDataBack = async (uid) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists())
        return undefined
    else
        return docSnap.data()
}
export const onAuthStateChangedListener = (cb) => onAuthStateChanged(auth, cb)