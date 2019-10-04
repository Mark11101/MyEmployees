import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export let firebaseConfig = {
    apiKey: "AIzaSyCzQfZE1llM6SshUMq3HuDZ-yUbJvQ4LV0",
    authDomain: "myemployees-9a164.firebaseapp.com",
    databaseURL: "https://myemployees-9a164.firebaseio.com",
    projectId: "myemployees-9a164",
    storageBucket: "myemployees-9a164.appspot.com",
    messagingSenderId: "610023043589",
    appId: "1:610023043589:web:c27c63d94c61a66be6226c",
    measurementId: "G-T3QSGSMWD3"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

export default firebase;