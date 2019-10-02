import * as React from 'react';
import {useEffect, useState} from "react";
import $ from 'jquery';

const AddEmployee = () => {

    const [photo, setPhoto]       = useState('');
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        //e.currentTarget.id === "email" ? setEmail(e.currentTarget.value) : setPassword(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(email);
    };

    useEffect(() => {
        $(document).ready( function() {
            function readURL(input: any) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e: any) {
                        $('#img-upload').attr('src', e.target.result);
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }

            $("#imgInp").change(function(){
                readURL(this);
            });
        });
    });

    return (
        <div className="container bg-light rounded">
            <h3 className="py-4">Add Employee</h3>
            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">Upload Image</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" id="imgInp" className="custom-file-input"/>
                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                    </div>
                </div>
                <img id='img-upload' alt="" className="my-3"/>

                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           id="fullName"
                           placeholder="Full Name"
                           onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           id="department"
                           placeholder="Department"
                           onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input type="email"
                           className="form-control"
                           id="email"
                           placeholder="Email"
                           onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           id="telephone"
                           placeholder="Telephone"
                           onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary my-3">Add</button>
            </form>
        </div>
    )
};

export default AddEmployee;