import * as React from 'react';
import { useState } from "react";

const SignUp = () => {

    const [email, setEmail]           = useState('');
    const [password, setPassword]     = useState('');
    const [firstName, setFirstName]   = useState('');
    const [secondName, setSecondName] = useState('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.currentTarget.id === "email" ? setEmail(e.currentTarget.value) : setPassword(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(email);
    };

    return (
        <div className="container bg-light rounded">
            <h3 className="py-4">Sign Up</h3>
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
            </form>
        </div>
    )
};

export default SignUp;