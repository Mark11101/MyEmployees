import * as React from 'react';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {deleteEmployee, updateEmployee} from "../../store/actions/employeeActions";

interface propsType {
    employees: any;
    auth: any;
    users: any
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

const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string): void => {
    e.dataTransfer.setData("id", id);
};

const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
};

const onDrop = (e: React.DragEvent<HTMLDivElement>, department: string, props: any): void => {
    let id = e.dataTransfer.getData("id");

    props.employees.filter((employee: employeesType) => {
        if (employee.fullName === id) {
            props.updateEmployee(employee, department);
        }
        return null;
    });
};

const handleDelete = (props: propsType, employee: employeesType, e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    props.deleteEmployee(employee);
};

const EmployeeSummary = (props: propsType) => {

    const { employees, auth, users } = props;

    let departments: any = {
        Frontend: [],
        Backend: [],
        Design: [],
        HR: [],
        Testing: [],
        Management: []
    };

    let userIsAdmin: boolean = false;

    const checkIfUserIsAdmin = (): void => {
        users && users.map((user: { email: string; type: string }) => {

            if ((auth.email === user.email) && user.type === "admin") {
                userIsAdmin = true;
            }

            return null;
        })
    };

    checkIfUserIsAdmin();

    employees && employees.forEach((employee: employeesType) => {
        if (userIsAdmin) {
            departments[employee.department].push(
                <Link to={'/employee/' + employee.id} key={employee.id}>
                    <div onDragStart = {(e) => onDragStart(e, employee.fullName)}
                         draggable
                         className="employeeSummary list-group-item d-flex justify-content-between align-items-center"
                    >
                        {employee.fullName}
                        <i className="deleteEmployee material-icons delete" onClick={(e) => handleDelete(props, employee, e)}>
                            delete_forever
                        </i>
                    </div>
                </Link>
            );
        } else {
            departments[employee.department].push(
                <Link to={'/employee/' + employee.id} key={employee.id}>
                    <div onDragStart = {(e) => onDragStart(e, employee.fullName)}
                         className="employeeSummary list-group-item d-flex justify-content-between align-items-center"
                    >
                        {employee.fullName}
                    </div>
                </Link>
            );
        }
    });

    return (
        <div className="container-drag">
            <div className="card Frontend" onDragOver={(e) => onDragOver(e)}
                                           onDrop={(e) => onDrop(e, "Frontend", props)}>
                <div className="card-header">
                    Frontend
                </div>
                {departments.Frontend}
            </div>
            <div className="card Backend" onDragOver={(e) => onDragOver(e)}
                                          onDrop={(e) => onDrop(e, "Backend", props)}>
                <div className="card-header">
                    Backend
                </div>
                {departments.Backend}
            </div>
            <div className="card Design" onDragOver={(e) => onDragOver(e)}
                 onDrop={(e) => onDrop(e, "Design", props)}>
                <div className="card-header">
                    Design
                </div>
                {departments.Design}
            </div>
            <div className="card HR" onDragOver={(e) => onDragOver(e)}
                 onDrop={(e) => onDrop(e, "HR", props)}>
                <div className="card-header">
                    HR
                </div>
                {departments.HR}
            </div>
            <div className="card Testing" onDragOver={(e) => onDragOver(e)}
                 onDrop={(e) => onDrop(e, "Testing", props)}>
                <div className="card-header">
                    Testing
                </div>
                {departments.Testing}
            </div>
            <div className="card Management" onDragOver={(e) => onDragOver(e)}
                 onDrop={(e) => onDrop(e, "Management", props)}>
                <div className="card-header">
                    Management
                </div>
                {departments.Management}
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteEmployee: (employee: employeesType) => dispatch(deleteEmployee(employee)),
        updateEmployee: (employee: employeesType, department: any) => dispatch(updateEmployee(employee, department))
    }
};

export default connect(null, mapDispatchToProps)(EmployeeSummary);