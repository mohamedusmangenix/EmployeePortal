import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getemployeeById, saveemployee } from '../Services/EmployeeServices';
import { useNavigate, useParams } from 'react-router';
import { APP_Routes } from '../Utils/Constants';

const validationSchema = Yup.object({
    firstname: Yup.string().required('firstname is required'),
    lastname: Yup.string().required('lastname is required'),
    dateofbirth: Yup.date().required('date of birth is required'),
    joiningdate: Yup.date().required('joining date is required'),
    department: Yup.string().required('department is required'),
    designation: Yup.string().required('designation is required'),
    status: Yup.string().required('status is required'),
});

const initialValues = {
    firstname: '',
    lastname: '',
    dateofbirth: '',
    joiningdate: '',
    department: '',
    designation: '',
    status: ''
}

function EmployeeForm() {
    const [employee, setEmployee] = React.useState(initialValues);
    const navigate = useNavigate();
    const { id } = useParams();

    const loademployee = async (Id) => {
        try {
            const response = await getemployeeById(Id);
            if (response.isSuccess) {
                setEmployee(response.data);
            }
            else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id) {
            loademployee(id);
        }
    }, [id]);

    const handlesubmit = async (values) => {
        try {
            const payload = {
                id: employee?.id ? employee.id : null,
                firstname: values.firstname,
                lastname: values.lastname,
                dateofbirth: values.dateofbirth,
                joiningdate: values.joiningdate,
                department: values.department,
                designation: values.designation,
                status: values.status
            }
            const response = await saveemployee(payload)
            if (response.isSuccess) {
                alert('employee saved successfully');
                navigate(APP_Routes.EmployeeList);
            } else {
                alert('failed to save employee');
                console.log(response);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues: employee,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: handlesubmit,

    })
    
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className='p-4 border rounded-2xl w-96'>
                <h1 className='font-bold text-2xl'>Employee Form</h1>
                <div className='my-4'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col justify-between'>
                            <label htmlFor="firstname" className='font-semibold'>First Name: <span className='text-red-500'>*</span></label>
                            <input type="text" placeholder='firstname' name='firstname' className='p-2 border rounded-2xl my-2'
                                value={formik.values.firstname} onChange={formik.handleChange} />
                            {formik.touched.firstname && formik.errors.firstname ? <span className='text-red-500'>{formik.errors.firstname}</span> : null}
                        </div>
                        <div className='flex flex-col justify-between'>
                            <label htmlFor="lastname" className='font-semibold'>Last Name: <span className='text-red-500'>*</span></label>
                            <input type="text" placeholder='lastname' name='lastname' className='p-2 border rounded-2xl my-2'
                                value={formik.values.lastname} onChange={formik.handleChange} />
                            {formik.touched.lastname && formik.errors.lastname ? <span className='text-red-500'>{formik.errors.lastname}</span> : null}
                        </div>
                        <div className='flex flex-col justify-between'>
                            <label htmlFor="dateofbirth" className='font-semibold'>Date Of Birth: <span className='text-red-500'>*</span></label>
                            <input type="date" placeholder='date of birth' name='dateofbirth' className='p-2 border rounded-2xl my-2'
                                value={formik.values.dateofbirth} onChange={formik.handleChange} />
                        </div>
                        <div className='flex flex-col justify-between'>
                            <label htmlFor="joiningdate" className='font-semibold'>Joining Date: <span className='text-red-500'>*</span></label>
                            <input type="date" placeholder='joining date' name='joiningdate' className='p-2 border rounded-2xl my-2'
                                value={formik.values.joiningdate} onChange={formik.handleChange} />
                            {formik.touched.joiningdate && formik.errors.joiningdate ?
                                <span className='text-red-500'>{formik.errors.joiningdate}</span> : null}
                        </div>
                        <div className='flex flex-col justify-between'>
                            <label htmlFor="designation" className='font-semibold'>Designation: <span className='text-red-500'>*</span></label>
                            <select name="designation" id="" className='p-2 border rounded-2xl my-2'
                                value={formik.values.designation} onChange={formik.handleChange} >
                                <option value="">Select a Designation</option>
                                <option value="fullstackdeveloper">Full Stack Developer</option>
                                <option value="backenddeveloper">Backend Developer</option>
                                <option value="frontenddeveloper">Frontend Developer</option>
                                <option value="clouddeveloper">Cloud Developer</option>
                            </select>
                            {formik.touched.designation && formik.errors.designation ?
                                <span className='text-red-500'>{formik.errors.designation}</span> : null}
                        </div>
                        <div className='flex flex-col justify-between'>
                            <label htmlFor="department" className='font-semibold'>Department: <span className='text-red-500'>*</span></label>
                            <select name="department" id="" className='p-2 border rounded-2xl my-2'
                                value={formik.values.department} onChange={formik.handleChange}>
                                <option value="">Select a Department</option>
                                <option value="erp">EnterPrise</option>
                                <option value="crm">CRM</option>
                                <option value="support">Support</option>
                            </select>
                            {formik.touched.department && formik.errors.department ?
                                <span className='text-red-500'>{formik.errors.department}</span> : null}
                        </div>
                        <div className='flex flex-col justify-between'>
                            <label htmlFor="status" className='font-semibold'>Status: <span className='text-red-500'>*</span></label>
                            <select name="status" id="" className='p-2 border rounded-2xl my-2'
                                value={formik.values.status} onChange={formik.handleChange}>
                                <option value="">Select a Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">InActive</option>
                            </select>
                            {formik.touched.status && formik.errors.status ?
                                <span className='text-red-500'>{formik.errors.status}</span> : null}
                        </div>
                        <div className='flex justify-end items-center gap-4 mt-4'>
                            <button type='button'
                                className='border-red-600 text-red-600 shadow-sm hover:bg-red-300 hover:text-black border p-2 rounded-sm'
                                onClick={() => {navigate(APP_Routes.EmployeeList)}}
                            >
                                Cancel
                                </button>
                            <button type='submit' className='bg-blue-300 shadow-sm hover:bg-blue-600
                         hover:text-white border p-2 rounded-sm'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeeForm
