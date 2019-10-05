import * as React from 'react';
import EmployeeSummary from '../employees/EmployeeSummary';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

interface propsType {
    employees: any;
    users: any;
    auth: {
        email: string;
        uid: string
    }
}

const Dashboard = (props: propsType): object => {

    const { employees, auth, users } = props;

    if (!auth.uid) {
        return <Redirect to='/signin'/>
    }

    return (
        <div className="dashboard container">
            <div className="col s12 m6">
                <div className="card-columns">
                    <EmployeeSummary employees={employees} auth={auth} users={users}/>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: any): object => {console.log(state);
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