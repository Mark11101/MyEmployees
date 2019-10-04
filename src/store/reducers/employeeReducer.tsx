const initState = {};

interface employeeAction {
    type: string;
    err: {
        message: string
    }
}

const employeeReducer = (state = initState, action: any) => {
    if (action.type === 'ADD_EMPLOYEE') {
        console.log('added employee');
        return state;
    }

    else if (action.type === 'ADD_EMPLOYEE_ERROR') {
        console.log('added employee error', action.err.message);
        return state;
    }

    else {
        return state;
    }
};

export default employeeReducer;