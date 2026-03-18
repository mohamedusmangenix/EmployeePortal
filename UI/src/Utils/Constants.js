export const APP_Routes = {
    EmployeeList: '/employee',
    ADD_EMPLOYEE: '/employee/add',
    EDIT_EMPLOYEE: '/employee/edit/:id'
}

export const endpoints = {
    GET_ALL_EMPLOYEES: '/employees/getall',
    SAVE_EMPLOYEE: '/employees/saveEmployee',
    GET_EMLPOYEE_BY_ID: '/employees/getbyid/:id',
    DELETE_BY_ID: '/employees/deletebyid/:id'
}

export const baseurl = 'https://localhost:7281/api'