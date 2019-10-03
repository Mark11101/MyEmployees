import * as React from 'react';
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const SignedInLinks = (props: any) => {

    const { auth, employees } = props;

    const getEmployeeId = () => {

        let employeeId;

        employees && employees.map((employee: any) => {
            if (auth.email === employee.email) {console.log("fff");
                employeeId = employee.id;
            }
        });

        return employeeId
    };

    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink to='/addUser' className="nav-link mr-5">Add user</NavLink></li>
            <li className="nav-item"><NavLink to='/addEmployee' className="nav-link mr-5">Add employee</NavLink></li>
            <li className="nav-item nav-link mr-5"><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to={'/employee/' + getEmployeeId()} className="btn userIcon">My Data</NavLink></li>
        </ul>
    );
};

const mapStateToProps = (state: any) => {
    return {
        employees: state.firestore.ordered.employees,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'employees', orderBy: ['createdAt', 'desc']}
    ])
)(
    // @ts-ignore
    SignedInLinks
)