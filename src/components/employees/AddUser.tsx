import * as React from 'react';
import { useState} from "react";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import {useEffect} from "react";
import $ from "jquery";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const AddUser = (props: any) => {

    const { users } = props;

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

    let emailAlreadyExist: boolean = false;

    const checkIfEmailAlreadyExist = () => {
        users && users.map((user: any) => {

            if (user.email === email) {
                emailAlreadyExist = true;
            }

            return null;
        })
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): any => {

        e.preventDefault();

        checkIfEmailAlreadyExist();

        if (emailAlreadyExist) {
            alert("Email already exist!");
            return null;
        }

        props.signUp({
            fullName,
            email,
            password
        });

        props.history.push('/');
    };

    useEffect(() => {
        $(document).ready( function() {
            $('#fullName').bind('keyup blur',function(){
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
            </form>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        users: state.firestore.ordered.users,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        signUp: (newUser: any) => dispatch(signUp(newUser))
    }
};

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users'}
    ])
)(
    // @ts-ignore
    AddUser
)