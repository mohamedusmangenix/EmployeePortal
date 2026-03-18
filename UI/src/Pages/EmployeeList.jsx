import React, { useEffect } from 'react'
import { deleteemployeeById, getallemployees } from '../Services/EmployeeServices';
import { useNavigate } from 'react-router';
import { APP_Routes } from '../Utils/Constants';

function EmployeeList() {
    const [employeelist, setEmployeeList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();

    const loaddata = async () => {
        setLoading(true);
        try {
            const response = await getallemployees();
            if (response.isSuccess) {
                setEmployeeList(response.data);
            }
            else {
                setEmployeeList([]);
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handledelete = async (id) => {
        try {
            const isConfirmed = confirm('are you sure you want to delete this employee?');

            if (!isConfirmed) {
                return;
            }

            const response = await deleteemployeeById(id);
            if (response.isSuccess) {
                alert('employee deleted successfully');
                await loaddata();
            } else {
                alert('failed to delete employee');
                console.log(response);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loaddata();
    }, []);

    if (loading) {
        return <div className='h-screen flex justify-center items-center'>
            <h1 className='font-bold text-2xl'>Loading...</h1>
        </div>
    }

    const filteredEmployees = employeelist.filter(employee => {
        const firstname = employee?.firstname?.toLowerCase() || '';
        const lastname = employee?.lastname?.toLowerCase() || '';
        const fullName = `${firstname} ${lastname}`;
        const department = employee?.department?.toLowerCase() || '';
        const designation = employee?.designation?.toLowerCase() || '';
        const status = employee?.status?.toLowerCase() || '';
    return (
        fullName.includes(searchTerm.toLowerCase()) ||
        department.includes(searchTerm.toLowerCase()) ||
        designation.includes(searchTerm.toLowerCase()) ||
        status.includes(searchTerm.toLowerCase())
    )
        
    })

    return (
        <div className='h-screen flex justify-center items-start p-2'>
            <div className=' justify-center items-center'>
                <h1 className='font-bold text-2xl my-2'>Employee List</h1>
                <div className='flex justify-between'>
                    <input type="text" placeholder='search by name,designation,department,status' value={searchTerm} 
                    onChange={(e) => {setSearchTerm(e.target.value)}} 
                    className='border rounded-xl p-2 w-96 ' />
                    <button className='bg-blue-600 shadow-sm hover:bg-blue-300 hover:text-black border p-2 
                    rounded-md text-white' onClick={() => { navigate(APP_Routes.ADD_EMPLOYEE) }}>Add Employee</button>
                </div>
                <div className='w-full flex justify-center'>
                    <table className='mt-2 border'>
                        <thead className='bg-gray-300'>
                            <tr className=''>
                                <th className='text-left p-2 '>Name</th>
                                <th className='text-left p-2'>DOB</th>
                                <th className='text-left p-2'>Department</th>
                                <th className='text-left p-2'>Joining Date</th>
                                <th className='text-left p-2'>Designation</th>
                                <th className='text-left p-2'>Status</th>
                                <th className='text-left p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee, index) => (<tr key={index}>
                                <td className='text-left p-2'>{employee.firstname} {employee.lastname}</td>
                                <td className='text-left p-2'>{employee.dateofbirth}</td>
                                <td className='text-left p-2'>{employee.department}</td>
                                <td className='text-left p-2'>{employee.joiningdate}</td>
                                <td className='text-left p-2'>{employee.designation}</td>
                                <td className='text-left p-2'>{employee.status}</td>
                                <td>
                                    <div className='flex justify-between items-center p-2 gap-4'>
                                        <button className='p-2 border rounded-sm text-blue-700 hover:bg-blue-700 hover:text-white'
                                            onClick={() => { navigate(APP_Routes.EDIT_EMPLOYEE.replace(":id", employee?.id)) }}>
                                            Edit
                                        </button>
                                        <button className='p-2 border rounded-sm text-red-700 hover:text-white hover:bg-red-700'
                                            onClick={() => { handledelete(employee?.id) }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default EmployeeList
