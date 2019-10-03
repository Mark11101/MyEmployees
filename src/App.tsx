import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from "./components/dashboard/Dashboard";
import EmployeeDetails from './components/employees/EmployeeDetails';
import SignIn from "./components/auth/SignIn";
import AddEmployee from "./components/employees/AddEmployee";
import AddUser from "./components/employees/AddUser";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <div className="mt-5 pt-5">
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/employee/:id' component={EmployeeDetails} />
                        <Route path='/signin' component={SignIn} />
                        <Route path='/addEmployee' component={AddEmployee} />
                        <Route path='/addUser' component={AddUser} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;