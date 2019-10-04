interface employeeDataType {
    photo: string;
    fullName: string;
    department: string;
    email: string;
    telephone: string
}

export const addEmployee = (employee: employeeDataType) => {
    return (dispatch: any, getState: any, { getFirestore }: any) => {

        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;

        firestore.collection('employees').add({
            ...employee,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_EMPLOYEE', employee });
        }).catch((err: never) => {
            dispatch({ type: 'ADD_EMPLOYEE_ERROR', err})
        })
    }
};

export const deleteEmployee = (employee: { id: string }) => {
    return (dispatch: any, getState: any, { getFirestore }: any) => {

        const firestore = getFirestore();

        firestore.collection("employees").doc(employee.id).delete().then(function() {
            console.log('delete employee success');
        }).catch(() => {
            console.log('delete employee error');
        });
    }
};