import * as React from 'react';
import EmployeeList from '../employees/EmployeeList';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

const Dashboard = (props: any) => {

    const { employees, auth } = props;

    if (!auth.uid) {
        return <Redirect to='/signin'/>
    }

    return (
        <div className="dashboard container">
            <div className="col s12 m6">
                <EmployeeList employees={employees}/>
            </div>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        employees: state.firestore.ordered.employees,
        auth: state.firebase.auth
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