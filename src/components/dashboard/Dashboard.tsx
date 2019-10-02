import * as React from 'react';
import EmployeeList from '../employees/EmployeeList';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const Dashboard = (props: any) => {

    const { employees } = props;

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
    }
};

export default compose (
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'employees' }
    ])
)(
    // @ts-ignore
    Dashboard
)