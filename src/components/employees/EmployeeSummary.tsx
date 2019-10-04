import * as React from 'react';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {deleteEmployee} from "../../store/actions/employeeActions";

interface propsType {
    employees: any;
    deleteEmployee: any;
}

interface employeesType {
    id: string;
    photo: string;
    fullName: string;
    department: string;
    email: string;
    telephone: string
}

const handleDelete = (props: propsType, employee: employeesType, e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    props.deleteEmployee(employee);
};

const getEmployees = (department: string, props: propsType): object => {

    const { employees } = props;

    return employees && employees.map((employee: employeesType) => {
        if (employee.department === department) {
            return (
                <Link to={'/employee/' + employee.id} key={employee.id}>
                    <li className="employeeSummary list-group-item d-flex justify-content-between align-items-center">
                        {employee.fullName}
                        <i className="deleteEmployee material-icons delete" onClick={(e) => handleDelete(props, employee, e)}>
                            delete_forever
                        </i>
                    </li>
                </Link>
            )
        } else {
            return null;
        }
    })
};

const EmployeeSummary = (props: propsType) => {

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Frontend
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Frontend', props)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    Backend
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Backend', props)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    Design
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Design', props)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    HR
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('HR', props)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    Testing
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Testing', props)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    Management
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Management', props)}
                </ul>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteEmployee: (employee: employeesType) => dispatch(deleteEmployee(employee))
    }
};

export default connect(null, mapDispatchToProps)(EmployeeSummary);