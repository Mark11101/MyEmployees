import * as React from 'react';
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink to='/signup' className="nav-link mr-5">Sign Up</NavLink></li>
            <li className="nav-item"><NavLink to='/signin' className="nav-link">Log In</NavLink></li>
        </ul>
    );
};

export default SignedOutLinks;