const initState = {
    employees: [
        {id: '1', title: 'front', content: 'dfgdfgdfg', department: 'front'},
        {id: '2', title: 'back', content: 'dfgdfgdfg', department: 'back'},
        {id: '3', title: 'design', content: 'dfgdfgdfg', department: 'design'},
        {id: '4', title: 'hr', content: 'dfgdfgdfg', department: 'hr'},
        {id: '5', title: 'test', content: 'dfgdfgdfg', department: 'test'},
        {id: '6', title: 'manage', content: 'dfgdfgdfg', department: 'manage'},
        {id: '7', title: 'front', content: 'dfgdfgdfg', department: 'front'},
        {id: '8', title: 'back', content: 'dfgdfgdfg', department: 'back'},
        {id: '9', title: 'design', content: 'dfgdfgdfg', department: 'design'},
        {id: '10', title: 'hr', content: 'dfgdfgdfg', department: 'hr'},
        {id: '12', title: 'test', content: 'dfgdfgdfg', department: 'test'},
        {id: '13', title: 'manage', content: 'dfgdfgdfg', department: 'manage'},
        {id: '14', title: 'front', content: 'dfgdfgdfg', department: 'front'},
        {id: '15', title: 'back', content: 'dfgdfgdfg', department: 'back'},
        {id: '16', title: 'design', content: 'dfgdfgdfg', department: 'design'},
        {id: '17', title: 'hr', content: 'dfgdfgdfg', department: 'hr'},
        {id: '18', title: 'test', content: 'dfgdfgdfg', department: 'test'},
        {id: '19', title: 'manage', content: 'dfgdfgdfg', department: 'manage'},
    ]
};

const employeeReducer = (state = initState, action: any) => {
    if (action.type === 'ADD_EMPLOYEE') {
        console.log('added employee', action.employee);
        return state;
    }

    else if (action.type === 'ADD_EMPLOYEE_ERROR') {
        console.log('added employee error', action.err);
        return state;
    }

    else {
        return state;
    }
};

export default employeeReducer;