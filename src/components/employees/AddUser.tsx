import * as React from 'react';
import { useState} from "react";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import {useEffect} from "react";
import $ from "jquery";

const AddUser = (props: any) => {

    const { auth, authError } = props;

    const [fullName, setFullName] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e: any): void => {

        if (e.currentTarget.id === "fullName") {
            setFullName(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "password") {
            setPassword(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "email") {
            setEmail(e.currentTarget.value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

        e.preventDefault();

        props.signUp({
            fullName,
            email,
            password
        });

        props.history.push('/');
    };

    useEffect(() => {
        $(document).ready( function() {
            $('#inputFullName').bind('keyup blur',function(){
                let node: any = $(this);
                node.val(node.val().replace(/[^a-zA-Zа-яА-Я' ]+$/g,'') ); }
            );
        });
    });

    return (
        <div className="container bg-light rounded">
            <h3 className="py-4">Add user</h3>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <input type="text"
                           className="form-control inputFullName"
                           id="fullName"
                           placeholder="Full name"
                           onChange={handleChange}
                           required
                    />
                </div>

                <div className="form-group">
                    <input type="email"
                           className="form-control"
                           id="email"
                           placeholder="Email"
                           onChange={handleChange}
                           required
                    />
                </div>

                <div className="form-group">
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           onChange={handleChange}
                           required
                    />
                </div>

                <button type="submit" className="btn btn-primary my-3">Add</button>
                <div className="text-danger text-center pb-4">
                    { authError && email !== '' ? <p>{authError}</p> : null }
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);