import * as React from 'react';
import { useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";

const SignIn = (props: any) => {

    const { authError } = props;

    const [emailSignIn, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.currentTarget.id === "email" ? setEmail(e.currentTarget.value) : setPassword(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        props.signIn({
            emailSignIn,
            password
        })
    };

    return (
        <div className="container bg-light rounded">
            <h3 className="py-4">Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email"
                           className="form-control"
                           id="emailSignIn"
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
                <div className="red-text center">
                    { authError ? <p>{authError}</p> : null }
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        authError: state.auth.authError
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        signIn: (creds: any) => dispatch(signIn(creds))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);