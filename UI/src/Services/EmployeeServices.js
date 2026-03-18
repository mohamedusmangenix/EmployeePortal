import { baseurl, endpoints } from "../Utils/Constants"


export const getallemployees = async () => {
    try 
    {
     const response = await fetch(baseurl+ endpoints.GET_ALL_EMPLOYEES);
     const data = await response.json();
     return data;   
    } catch (error) {
        return error;
    }
}

export const getemployeeById = async (id) => {
    try 
    {
     const response = await fetch(baseurl+ endpoints.GET_EMLPOYEE_BY_ID.replace(':id',id));
     const data = await response.json();
     return data;   
    } catch (error) {
        return error;
    }
}

export const saveemployee = async (employeedata) => {
    try 
    {
        const response = await fetch(baseurl+ endpoints.SAVE_EMPLOYEE,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeedata)
        })
        const data = await response.json();
        return data;    
    } catch (error) {
        return error;
    }
}

export const deleteemployeeById = async (id) => {
    try 
    {
        const response = await fetch(baseurl+ endpoints.DELETE_BY_ID.replace(':id',id));    
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}