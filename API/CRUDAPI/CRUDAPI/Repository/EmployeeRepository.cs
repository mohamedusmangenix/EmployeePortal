using CRUDAPI.Interfaces;
using CRUDAPI.Models;
using CRUDAPI.Models.DBModels;
using CRUDAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Repository
{
    public class EmployeeRepository : IEmployeeRespository
    {
        private ApplicationDBContext context;

        public EmployeeRepository(ApplicationDBContext _context)
        {
            context = _context;
        }

        public async Task<ResponseModel> GetAll()
        { var result = new ResponseModel();
            try { 
                var employeelist =await context.Employees.Where(e => e.status =="active").
                    Select(e => new EmployeeDTO
                    {
                        Id = e.Id,
                        firstname = e.firstname,
                        lastname = e.lastname,
                        Dateofbirth = e.Dateofbirth.ToString("dd-MM-yyyy"),
                        department = e.department,
                        joiningdate = e.joiningdate.ToString("dd-MM-yyyy"),
                        Designation = e.Designation,
                        status = e.status

                    }).ToListAsync();
                result.IsSuccess = true;
                result.Message= "Emplouyee list fetched succesfully";
                result.Data = employeelist;

            }
            catch (Exception e)
            {
                result.IsSuccess = false;
                result.Message = e.Message;
                result.Data = null;
            }
            return result;
        }

        public async Task<ResponseModel> GetbyId(string id)
        {
            var result = new ResponseModel();
            try {
                var employee = await context.Employees.FindAsync(id);
                if(employee != null)
                {
                    result.IsSuccess = true;
                    result.Message = "Employee data retrieved successfully";
                    result.Data = employee;
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Employee not found";
                    result.Data = null;

                }
            }
            catch (Exception e)
            {
                result.IsSuccess = false;
                result.Message = e.Message;
                result.Data = null;
            }
            return result;
        }

        public async Task<ResponseModel> SaveEmployee(EmployeesModel employeesModel)
        {
            var result = new ResponseModel();
            try {
                var employee = new EmployeesModel
                {
                    firstname = employeesModel.firstname,
                    lastname = employeesModel.lastname,
                    Dateofbirth = employeesModel.Dateofbirth,
                    department = employeesModel.department,
                    joiningdate = employeesModel.joiningdate,
                    Designation = employeesModel.Designation,
                    status = employeesModel.status
                };
                if(employeesModel.Id != null && employeesModel.Id != "")
                {
                    employee.Id = employeesModel.Id;
                }


                var existingEmployee = await context.Employees.FindAsync(employeesModel.Id);
                    if(existingEmployee != null)
                {
                    existingEmployee.firstname = employee.firstname;
                    existingEmployee.lastname = employee.lastname;
                    existingEmployee.Dateofbirth = employee.Dateofbirth;
                    existingEmployee.department = employee.department;
                    existingEmployee.joiningdate = employee.joiningdate;
                    existingEmployee.Designation = employee.Designation;
                    existingEmployee.status = employee.status;
                    context.Employees.Update(existingEmployee);
                    result.IsSuccess = true;
                    result.Message = "Employee data updated successfully";
                }
                else
                {
                    await context.Employees.AddAsync(employee);
                    result.IsSuccess = true;
                    result.Message = "Employee data saved successfully";
                }
                await context.SaveChangesAsync();
                result.Data = employee;
            }
            catch (Exception e)
            {
                result.IsSuccess = false;
                result.Message = e.Message;
                result.Data = null;
            }
            return result;
        }

        public async Task<ResponseModel> DeleteById(string id)
        {
            var result = new ResponseModel();
            try
            {
                var employee = await context.Employees.FindAsync(id);
                if (employee != null)
                {
                    employee.status = "inactive";
                    await context.SaveChangesAsync();
                    result.IsSuccess = true;
                    result.Message = "Employee Deleted successfully";
                    result.Data = null;
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Employee not found";
                    result.Data = null;

                }
            }
            catch (Exception e)
            {
                result.IsSuccess = false;
                result.Message = e.Message;
                result.Data = null;
            }
            return result;
        }

    }
}
