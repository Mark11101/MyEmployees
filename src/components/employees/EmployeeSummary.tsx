import * as React from 'react';
import { Link } from "react-router-dom";

const getEmployees = (department: string, employees: any): object => {
    return employees && employees.map((employee: { department: string, fullName: string, id: number }) => {
        if (employee.department === department) {console.log(employee.id);
            return (
                <Link to={'/employee/' + employee.id} key={employee.id}>
                    <li className="list-group-item">{employee.fullName}</li>
                </Link>
            )
        } else {
            return null;
        }
    })
};

const EmployeeSummary = ({employees}: any) => {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Frontend
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Frontend', employees)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    Backend
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Backend', employees)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    Design
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Design', employees)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    HR
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('HR', employees)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    Testing
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Testing', employees)}
                </ul>
            </div>
            <div className="card">
                <div className="card-header">
                    Management
                </div>
                <ul className="list-group list-group-flush">
                    {getEmployees('Management', employees)}
                </ul>
            </div>
        </div>
    )
};

export default EmployeeSummary;