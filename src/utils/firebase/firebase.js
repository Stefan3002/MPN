// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {signInWithPopup, getAuth, GoogleAuthProvider, onAuthStateChanged, signOut} from 'firebase/auth'
import {doc, setDoc, getDoc, getFirestore, collection, getDocs} from 'firebase/firestore'
import {useState} from "react";

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
            following: [{
                uid: '5KCTw3lxS0abgFA1uZog0lq30WJ3',
                email: 'secrieru2302@gmail.com'
            }],
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
    else {
        console.log(docSnap.data())
        return docSnap.data()
    }
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
            hearts: 0,
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
            console.log(currentUser)
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

export const getFollowingDataBack = async (following) => {

    const followingList = []
    for (const followingPerson of following) {
        const {uid} = followingPerson
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists())
            return undefined
        else {
            const followedUser = docSnap.data()
            const {displayName, photoURL, uid} = followedUser
            followingList.push({
                uid,
                displayName,
                photoURL
            })
        }
    }
    return followingList
}

export const increaseHeartsBack = async (uid, noteData) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists())
        return undefined
    else{
        const notes = docSnap.data().notes
        notes.forEach((note, idx) => {
            if (note.title === noteData.title)
                notes[idx].hearts++
                })
        await setDoc(docRef, {
            ...docSnap.data(),
            notes
        })
        const updatedDocSnap = await getDoc(docRef)
        console.log(updatedDocSnap.data().notes)
        let updatedNote = undefined
        updatedDocSnap.data().notes.forEach((note) => {if(note.title === noteData.title) updatedNote = note})
        return updatedNote
    }
}

export const addFollowingBack = async (currentUserData, userUid) => {
    const docRef = doc(db, 'users', currentUserData.uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists())
        return undefined
    else{
        const {following} = docSnap.data()

        let found = false
        for(let followingPerson of following) {
            console.log(followingPerson, {uid: userUid})
            if (followingPerson.toString() === {uid: userUid}.toString()) {
                found = true
                break
            }
        }
        if(!found)
            await setDoc(docRef, {
                ...docSnap.data(),
                following: [...following, {uid: userUid}]
            })
    }
}

export const removeFollowingBack = async (currentUserData, userUid) => {
    const docRef = doc(db, 'users', currentUserData.uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists())
        return undefined
    else{
        const {following} = docSnap.data()

        const newFollowing = following.filter(followingPerson => followingPerson.toString() !== {uid: userUid}.toString())
        await setDoc(docRef, {
            ...docSnap.data(),
            following: newFollowing
        })
    }
}



export const transformDateBack = (createdAt) => {
    return createdAt.toDate()
}


export const signOutBack = async () => {
    await signOut(auth)
}

export const onAuthStateChangedListener = (cb) => onAuthStateChanged(auth, cb)