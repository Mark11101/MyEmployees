import * as React from 'react';
import EmployeeSummary from './EmployeeSummary';

const EmployeeList = () => {
  return (
      <div className="card-columns">
        <EmployeeSummary />
        <EmployeeSummary />
        <EmployeeSummary />
        <EmployeeSummary />
        <EmployeeSummary />
        <EmployeeSummary />
      </div>
  )
};

export default EmployeeList;