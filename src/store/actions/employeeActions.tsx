export const addEmployee = (employee: any) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {

        const firestore = getFirestore();
        firestore.collection('employees').add({
            ...employee,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_EMPLOYEE', employee });
        }).catch((err: never) => {
            dispatch({ type: 'ADD_EMPLOYEE_ERROR', err})
        })
    }
};