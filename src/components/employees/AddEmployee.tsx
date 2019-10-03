import * as React from 'react';
import {useEffect, useState} from "react";
import $ from 'jquery';
import { connect } from "react-redux";
import { addEmployee } from "../../store/actions/employeeActions";
import { Redirect } from "react-router-dom";

const AddEmployee = (props: any) => {

    const [photo, setPhoto]           = useState('');
    const [fullName, setFullName]     = useState('');
    const [department, setDepartment] = useState('');
    const [emailAdd, setEmail]        = useState('');
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

        else if (e.currentTarget.id === "emailAdd") {
            setEmail(e.currentTarget.value);
        }

        else if (e.currentTarget.id === "telephone") {
            setTelephone(e.currentTarget.value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

        e.preventDefault();

        if (!fullName.match(/[a-zA-zА-Я-а-я]/g)) {
            alert("Input your fullname!");
        }

        if (photo !== "" && !photo.match(/^https?:\/\//i)) {
            alert("Not valid URL!");
        }

        props.addEmployee({
            photo,
            fullName,
            department,
            emailAdd,
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

            $('#inputFullName').bind('keyup blur',function(){
                let node: any = $(this);
                node.val(node.val().replace(/[^a-zA-Zа-яА-Я' ]+$/g,'') ); }
            );
        });
    });

    const { auth } = props;

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
                    <div className="invalid-feedback">
                        Please provide a valid city.
                    </div>
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
                           id="emailAdd"
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

const mapStateToProps = (state: any) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addEmployee: (employee: any) => dispatch(addEmployee(employee))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);