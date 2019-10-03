import * as React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props: any) => {

    const { profile } = props;

    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink to='/addEmployee' className="nav-link mr-5">Add employee</NavLink></li>
            <li className="nav-item nav-link mr-5"><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className="btn userIcon">
                {profile.initials}
            </NavLink></li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks);