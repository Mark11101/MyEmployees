import * as React from 'react';
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink to='/' className="nav-link mr-5">Sign Up</NavLink></li>
            <li className="nav-item"><NavLink to='/' className="nav-link">Log In</NavLink></li>
        </ul>
    );
};

export default SignedOutLinks;