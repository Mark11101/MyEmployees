import * as React from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import noImage from "../../images/noimage.png";

interface propsType {
    employee: {
        photo: string;
        fullName: string;
        department: string;
        email: string;
        telephone: string
    };
    auth: {
        uid: string
    };
}

const EmployeeDetails = (props: propsType) => {

    const { employee, auth } = props;

    if (!auth.uid) {
        return <Redirect to='/signin' />
    }

    if (employee) {
        return (
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-md-3">
                        <img src={employee.photo ? employee.photo : noImage} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-9 mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Fullname: {employee.fullName}</li>
                            <li className="list-group-item">Department: {employee.department}</li>
                            <li className="list-group-item">Email: {employee.email}</li>
                            <li className="list-group-item">Telephone: {employee.telephone}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading employee's data...</p>
            </div>
        )
    }
};

const mapStateToProps = (state: any, ownProps: any) => {

    const id: string = ownProps.match.params.id;
    const employees = state.firestore.data.employees;
    const employee = employees ? employees[id] : null;

    return {
        employee: employee,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'employees'}
    ])
)(
    // @ts-ignore
    EmployeeDetails
);