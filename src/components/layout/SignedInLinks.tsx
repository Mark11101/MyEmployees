import * as React from 'react';
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink to='/' className="nav-link mr-5">New employee</NavLink></li>
            <li className="nav-item"><NavLink to='/' className="nav-link">Log Out</NavLink></li>
        </ul>
    );
};

export default SignedInLinks;