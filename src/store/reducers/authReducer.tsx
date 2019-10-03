const initState = {
    authError: ''
};

const authReducer = (state = initState, action: any) => {
    if (action.type === "LOGIN_ERROR") {
        return {
            ...state,
            authError: 'Login failed'
        };
    }

    else if (action.type === "LOGIN_SUCCESS") {
        return  {
            ...state,
            authError: ''
        }
    }

    else if (action.type === "SIGNOUT_SUCCESS") {
        return  {
            ...state
        }
    }

    else {
        return state;
    }
};

export default authReducer;