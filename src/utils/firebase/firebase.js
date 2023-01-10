// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {signInWithPopup, getAuth, GoogleAuthProvider, onAuthStateChanged, signOut} from 'firebase/auth'
import {doc, setDoc, getDoc, getFirestore, collection, getDocs} from 'firebase/firestore'

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
            notes: [],
            following: [],
            uid,
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

export const addNoteBack = async (title, content, selectedLang, shareable, uid) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists())
        return undefined
    else {
        const createdAt = new Date()
        const notes = docSnap.data().notes
        notes.push({
            title,
            content,
            selectedLang,
            shareable,
            createdAt
        })
        await setDoc(docRef, {
            ...docSnap.data(),
            notes
        })
        return await getDoc(docRef)
    }
}
export const getLanguagesBack = async () => {
    const languages = []
    const docsSnap = await getDocs(collection(db, 'languages'))
    docsSnap.forEach((docSnap) => languages.push(docSnap.data()))
    return languages
}

export const deleteNoteBack = async (uid, noteTitle) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists())
        return undefined
    else{
        const {notes} = docSnap.data()
        const newNotes = notes.filter((note) => note.title !== noteTitle)
        await setDoc(docRef, {
            ...docSnap.data(),
            notes: newNotes
        })
        const newDocSnap = await getDoc(docRef)
        return newDocSnap.data()
    }
}
export const modifyNoteBack = async (uid, noteTitle, newNote) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists())
        return undefined
    else{
        const {notes} = docSnap.data()
        const newNotes = notes.filter((note) => note.title !== noteTitle)
        await setDoc(docRef, {
            ...docSnap.data(),
            notes: newNotes
        })
        const newDocSnap = await getDoc(docRef)
        return newDocSnap.data()
    }
}

export const computeFeedBack = async (currentUser) => {
    if(currentUser) {
        const feed = []
        const usersSnap = await getDocs(collection(db, 'users'))
        usersSnap.forEach((userSnap) => {
            const userData = userSnap.data()
            const {email} = userSnap.data()
            if (currentUser.following.filter((following) => following.email === email).length === 1) {
                const {notes, displayName, photoURL, uid} = userData
                notes.forEach((note) => {
                    if (note.shareable)
                        feed.push({
                            userDisplayName: displayName,
                            userNote: note,
                            userImg: photoURL,
                            uid
                        })
                })
            }
        })
        return feed
    }
    else
        return []
}

export const getUserPublicDataBack = async (userUid) => {
    if(!userUid)
        return {
        name: 'User not found!'
        }
    const docRef = doc(db, 'users', userUid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists())
        return {
        name: "User not found!"
        }
    else{
        const userData = docSnap.data()
        const {displayName, photoURL, notes} = userData
        let publicNotes = notes.filter((note) => note.shareable)
        if(publicNotes.length === 0)
            publicNotes = []
        console.log(publicNotes)
        return {
            name: displayName,
            photoURL,
            notes: publicNotes
        }
    }
}

export const getFollowingDataBack = (following) => {
    const followingList = []
    following.forEach(async (followingPerson) => {
        const {uid} = followingPerson
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)
        if(!docSnap.exists())
            return undefined
        else{
            const followedUser = docSnap.data()
            console.log(followedUser)
            const {displayName, photoURL} = followedUser
            followingList.push({
                displayName,
                photoURL
            })
        }
    })
    console.log(following, followingList)
    return followingList
}

export const signOutBack = async () => {
    await signOut(auth)
}

export const onAuthStateChangedListener = (cb) => onAuthStateChanged(auth, cb)