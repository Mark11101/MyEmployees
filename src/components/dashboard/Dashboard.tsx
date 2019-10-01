import * as React from 'react';
import EmployeeList from '../employees/EmployeeList';

const Dashboard = () => {
    return (
        <div className="dashboard container">
            <div className="col s12 m6">
                <EmployeeList/>
            </div>
        </div>
    )
};

export default Dashboard;