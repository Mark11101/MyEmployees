import * as React from 'react';
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const SignedInLinks = (props: any) => {

    const { auth, employees, users } = props;

    let userIsAdmin: boolean = false;

    const checkIfUserIsAdmin = () => {
        users && users.map((user: any) => {

            if ((auth.email === user.email) && user.type === "admin") {
                userIsAdmin = true;
            }

            return null;
        })
    };

    const getEmployeeId = () => {

        let employeeId = 0;

        employees && employees.map((employee: any) => {

            if (auth.email === employee.email) {
                employeeId = employee.id;
            }

            return null;
        });

        return employeeId;
    };

    checkIfUserIsAdmin();

    const outMyDataBtn = () => {

        let id = getEmployeeId();

        if (id === 0 && userIsAdmin) {
            return <li><NavLink to='/addEmployee' className="btn userIcon">My Data</NavLink></li>
        }

        else if (id === 0 && !userIsAdmin) {
            return <li><NavLink to='/' className="btn userIcon">My Data</NavLink></li>
        }

        else {
            return <li><NavLink to={'/employee/' + id} className="btn userIcon">My Data</NavLink></li>
        }
    };

    const outAdminButtons = () => {
        if (userIsAdmin) {
            return (
                <div className="row">
                    <li className="nav-item"><NavLink to='/addUser' className="nav-link mr-5" href="#">Add user</NavLink></li>
                    <li className="nav-item"><NavLink to='/addEmployee' className="nav-link mr-5" href="#">Add employee</NavLink></li>
                </div>
            )
        }
    };

    return (
        <ul className="navbar-nav ml-auto">
            {outAdminButtons()}
            <li className="nav-item nav-link mr-5"><a onClick={props.signOut}>Log Out</a></li>
            {outMyDataBtn()}
        </ul>
    );
};

const mapStateToProps = (state: any) => {
    return {
        employees: state.firestore.ordered.employees,
        users: state.firestore.ordered.users
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
        { collection: 'employees', orderBy: ['createdAt', 'desc']},
        { collection: 'users'}
    ])
)(
    // @ts-ignore
    SignedInLinks
)