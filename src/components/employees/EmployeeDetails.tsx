import * as React from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const EmployeeDetails = (props: any) => {

    const { employee } = props;

    if (employee) {
        return (
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-md-3">
                        <img src={employee.photo} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-9 mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{employee.fullName}</li>
                            <li className="list-group-item">{employee.department}</li>
                            <li className="list-group-item">{employee.emailAdd}</li>
                            <li className="list-group-item">{employee.telephone}</li>
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

    const id = ownProps.match.params.id;
    const employees = state.firestore.data.employees;
    const employee = employees ? employees[id] : null;

    return {
        employee: employee
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