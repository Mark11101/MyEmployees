import * as React from 'react';
import { useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

interface propsType {
    authError: string;
    auth: {
        email: string;
        uid: string
    }
    employees: any;
    signIn: any;
}

const SignIn = (props: propsType): object => {

    const { authError, auth, employees } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.currentTarget.id === "email" ? setEmail(e.currentTarget.value) : setPassword(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        props.signIn({
            email,
            password
        })
    };

    const getEmployeeId = (): string => {

        let employeeId: string = '';

        employees && employees.map((employee: {email: string, id: string}) => {

            if (auth.email === employee.email) {
                employeeId = employee.id;
            }

            return '';
        });

        return employeeId
    };

    if (auth.uid) {

        let id: string = getEmployeeId();

        if (id === '') {
            return <Redirect to='/'/>
        } else {
            return <Redirect to={'/employee/' + id}/>
        }
    }

    return (
        <div className="container bg-light rounded">
            <h3 className="py-4">Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email"
                           className="form-control"
                           id="email"
                           placeholder="Enter email"
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-3">Sign In</button>
                <div className="text-danger text-center pb-4">
                    { authError && email !== '' ? <p>{authError}</p> : null }
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state: any): object => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        employees: state.firestore.ordered.employees,
    }
};

const mapDispatchToProps = (dispatch: any): object => {
    return {
        signIn: (creds: {email: string, password: string}) => dispatch(signIn(creds))
    }
};

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'employees', orderBy: ['createdAt', 'desc']}
    ])
)(
    // @ts-ignore
    SignIn
)