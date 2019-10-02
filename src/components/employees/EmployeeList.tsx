import * as React from 'react';
import EmployeeSummary from './EmployeeSummary';

const EmployeeList = ({employees}: any) => {
  return (
      <div className="card-columns">
          <EmployeeSummary employees={employees}/>
      </div>
  )
};

export default EmployeeList;