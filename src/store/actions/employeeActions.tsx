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

export const updateEmployee = (employee: any, department: any) => {
    return (dispatch: any, getState: any, { getFirestore }: any) => {

        const firestore = getFirestore();

        let employeeCollection = firestore.collection("employees").doc(employee.id);

        return employeeCollection.update({
            department: department
        }).then(() => {
            console.log("department was renamed!");
        }).catch(function() {
            // The document probably doesn't exist.
            console.error("Error updating document: ");
        });
    }
};