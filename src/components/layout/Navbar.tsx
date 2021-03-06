import * as React from 'react';
import { Link } from "react-router-dom";
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';

interface propsType {
    auth: {
        uid: string
    }
}

const Navbar = (props: propsType) => {

    const { auth } = props;

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to='/' className="navbar-brand ml-5"><span className="logo">My Employees</span></Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
                    { auth.uid ? <SignedInLinks auth={auth} /> : null }
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state: any) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(Navbar);