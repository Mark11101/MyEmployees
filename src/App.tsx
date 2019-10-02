import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from "./components/dashboard/Dashboard";
import EmployeeDetails from './components/employees/EmployeeDetails';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AddEmployee from "./components/employees/AddEmployee";

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
                        <Route path='/signup' component={SignUp} />
                        <Route path='/addEmployee' component={AddEmployee} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;