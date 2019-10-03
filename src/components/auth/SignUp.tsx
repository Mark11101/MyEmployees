import * as React from 'react';
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

const SignUp = (props: any) => {

    const [emailSignUp, setEmail]           = useState('');
    const [password, setPassword]     = useState('');
    const [firstName, setFirstName]   = useState('');
    const [lastName, setLastName] = useState('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        if (e.currentTarget.id === "emailSignUp") {
            setEmail(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "password") {
            setPassword(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "firstName") {
            setFirstName(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "lastName") {
            setLastName(e.currentTarget.value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        props.signUp({
            emailSignUp,
            password,
            firstName,
            lastName
        })
    };

    const { auth, authError } = props;

    if (auth.uid) {
        return <Redirect to='/' />
    }
    console.log(authError);
    return (
        <div className="container bg-light rounded">
            <h3 className="py-4">Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email"
                           className="form-control"
                           id="emailSignUp"
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
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           id="firstName"
                           placeholder="First Name"
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           id="lastName"
                           placeholder="Last Name"
                           onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-3">Sign Up</button>
                <div className="text-danger text-center pb-4">
                    { authError ? <p>{authError}</p> : null }
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        signUp: (newUser: any) => dispatch(signUp(newUser))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);