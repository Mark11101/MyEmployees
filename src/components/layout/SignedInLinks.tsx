import * as React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props: any) => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink to='/addEmployee' className="nav-link mr-5">New employee</NavLink></li>
            <li className="nav-item"><a onClick={props.signOut}>Log Out</a></li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks);