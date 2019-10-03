import * as React from 'react';
import { Link } from "react-router-dom";
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props: any) => {

    const { auth, profile } = props;

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to='/' className="navbar-brand ml-5">My Employees</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse mr-5" id="navbarSupportedContent">
                    { auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks /> }
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state: any) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default connect(mapStateToProps)(Navbar);