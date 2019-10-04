import * as React from 'react';
import {useEffect, useState} from "react";
import $ from 'jquery';
import { connect } from "react-redux";
import { addEmployee } from "../../store/actions/employeeActions";
import { Redirect } from "react-router-dom";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

interface propsType {
    employees: any;
    auth: {
        email: string;
        uid: string
    };
    addEmployee: any;
    history: any;
}

const AddEmployee = (props: propsType) => {

    const { auth, employees } = props;

    const [photo, setPhoto]           = useState('');
    const [fullName, setFullName]     = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail]           = useState('');
    const [telephone, setTelephone]   = useState('');

    const handleChange = (e: any): void => {

        if (e.currentTarget.id === "photo") {
            setPhoto(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "fullName") {
            setFullName(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "department") {
            setDepartment(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "email") {
            setEmail(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "telephone") {
            setTelephone(e.currentTarget.value);
        }
    };

    let emailAlreadyExist: boolean = false;

    const checkIfEmailAlreadyExist = (): any => {
        employees && employees.map((employee: { email: string }) => {

            if (employee.email === email) {
                emailAlreadyExist = true;
            }

            return null;
        })
    };

    const checkValidInput = (): any => {

        checkIfEmailAlreadyExist();

        if (emailAlreadyExist) {
            alert("Email already exist!");
            return null;
        }

        if (!fullName.match(/[a-zA-zА-Я-а-я]/g)) {
            alert("Input your fullname!");
            return null;
        }

        if (photo !== "" && !photo.match(/^https?:\/\//i)) {
            alert("Not valid URL!");
            return null;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): any => {

        e.preventDefault();

        if (checkValidInput() === null) {
            return null;
        }

        props.addEmployee({
            photo,
            fullName,
            department,
            email,
            telephone
        });

        props.history.push('/');
    };

    useEffect(() => {
        $(document).ready( function() {
            function readURL(input: any) {
                if (input.files && input.files[0]) {
                    let reader = new FileReader();

                    reader.onload = function (e: any) {
                        $('#img-upload').attr('src', e.target.result);
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }

            $("#imgInp").change(function(){
                readURL(this);
            });

            $('#fullName').bind('keyup blur',function(){
                let node: any = $(this);
                node.val(node.val().replace(/[^a-zA-Zа-яА-Я' ]+$/g,'') ); }
            );
        });
    });

    if (!auth.uid) {
        return <Redirect to='/signin' />
    }

    return (
        <div className="container bg-light rounded">
            <h3 className="py-4">Add Employee</h3>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <input type="text"
                           className="form-control inputFullName"
                           id="photo"
                           placeholder="Photo URL"
                           onChange={handleChange}
                    />
                </div>
                <img src={photo} id='img-upload' alt="" className="my-3"/>

                <div className="form-group">
                    <input type="text"
                           className="form-control inputFullName"
                           id="fullName"
                           placeholder="Full Name"
                           onChange={handleChange}
                           required
                    />
                </div>

                <div className="form-group">
                    <select className="custom-select" id="department" value={department} onChange={handleChange} required>
                        <option value="" hidden>Department</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Design">Design</option>
                        <option value="HR">HR</option>
                        <option value="Testing">Testing</option>
                        <option value="Management">Management</option>
                    </select>
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
                    <input type="number"
                           className="form-control"
                           id="telephone"
                           placeholder="Telephone"
                           onChange={handleChange}
                           required
                    />
                </div>

                <button type="submit" className="btn btn-primary my-3">Add</button>
            </form>
        </div>
    )
};

interface employeeType {
    photo: string;
    fullName: string;
    department: string;
    email: string;
    telephone: string
}

const mapStateToProps = (state: any) => {
    return {
        auth: state.firebase.auth,
        employees: state.firestore.ordered.employees,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addEmployee: (employee: employeeType) => dispatch(addEmployee(employee))
    }
};

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'employees'}
    ])
)(
    // @ts-ignore
    AddEmployee
)