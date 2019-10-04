import * as firebase from "firebase";

export const signIn = (credentials: any) => {
    return (dispatch: any, getState: any, { getFirebase }: any) => {

        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword (
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err: any) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        })
    }
};

export const signOut = () => {
    return (dispatch: any, getState: any, { getFirebase }: any) => {

        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        })
    }
};

let config = {
    apiKey: "AIzaSyCzQfZE1llM6SshUMq3HuDZ-yUbJvQ4LV0",
    authDomain: "myemployees-9a164.firebaseapp.com",
    databaseURL: "https://myemployees-9a164.firebaseio.com",
};

let secondaryApp = firebase.initializeApp(config, "Secondary");

export const signUp = (newUser: any) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

        //const firebase  = getFirebase();
        const firestore = getFirestore();

        secondaryApp.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp: any) => {
            secondaryApp.auth().signOut();
            return firestore.collection('users').add({
                ...newUser,
                type: "visitor",
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS'})
        }).catch((err: any) => {
            dispatch({ type: 'SIGNUP_ERROR', err})
        })
    }
};