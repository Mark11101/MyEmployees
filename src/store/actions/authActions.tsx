export const signIn = (credentials: any) => {
    return (dispatch: any, getState: any, { getFirebase }: any) => {

        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword (
            credentials.emailSignIn,
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

export const signUp = (newUser: any) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.emailSignUp,
            newUser.password
        ).then((resp: any) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                ...newUser,
                initials: newUser.lastName[0] + newUser.firstName[0],
                type: "visitor",
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS'})
        }).catch((err: any) => {
            dispatch({ type: 'SIGNUP_ERROR', err})
        })
    }
};