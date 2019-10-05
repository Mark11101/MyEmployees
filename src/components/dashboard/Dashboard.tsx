import * as React from 'react';
import EmployeeSummary from '../employees/EmployeeSummary';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import firebase from 'firebase/app';

interface propsType {
    employees: any;
    users: any;
    auth: {
        email: string;
        uid: string
    }
}


const firebaseConfig = {
    apiKey: "AIzaSyCzQfZE1llM6SshUMq3HuDZ-yUbJvQ4LV0",
    authDomain: "myemployees-9a164.firebaseapp.com",
    databaseURL: "https://myemployees-9a164.firebaseio.com",
    storageBucket: "myemployees-9a164.appspot.com",
};

firebase.initializeApp(firebaseConfig);

var storage = require('@google-cloud/storage');

// Get a reference to the storage service, which is used to create references in your storage bucket
const fileStorage = firebase.storage();
// Points to the root reference
var storageRef = firebase.storage().ref();

// Points to 'images'
var imagesRef = storageRef.child('image');

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
var fileName = 'Roman.jpg';
var spaceRef = imagesRef.child(fileName);

// File path is 'images/space.jpg'
var path = spaceRef.fullPath;

// File name is 'space.jpg'
var name = spaceRef.name;

// Points to 'images'
var imagesRef = spaceRef.parent;


const Dashboard = (props: propsType): object => {

    const { employees, auth, users } = props;

    const [photo, setPhoto] = useState(null);

    if (!auth.uid) {
        return <Redirect to='/signin'/>
    }

    const fileSelectedHandler = (e: any) => {
        setPhoto(e.target.files[0]);
    };

    const fileUploadHandler = () => {
        console.log(photo);
    };

    return (
        <div className="dashboard container">
            <div className="col s12 m6">
                <div className="card-columns">
                    <EmployeeSummary employees={employees} auth={auth} users={users}/>
                    <input type="file" onChange={fileSelectedHandler}/>
                    <button onClick={fileUploadHandler}>Upload</button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: any): object => {
    return {
        employees: state.firestore.ordered.employees,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users
    }
};

export default compose (
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'employees', orderBy: ['createdAt', 'desc']}
    ])
)(
    // @ts-ignore
    Dashboard
)