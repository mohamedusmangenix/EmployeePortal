using CRUDAPI.Interfaces;
using CRUDAPI.Models.DBModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CRUDAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private IEmployeeRespository employeeRespository;

        public EmployeesController(IEmployeeRespository _employeeRespository)
        {
            employeeRespository = _employeeRespository;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var response = await employeeRespository.GetAll();
                if (response.IsSuccess)
                {
                    return Ok(response);
                }
                return BadRequest(response);

            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModel
                {
                    IsSuccess = false,
                    Message = ex.Message,
                    Data = null
                }
                    );
            }
        }

        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetbyId(string id)
        {
            try
            {
                if(id ==null || id == "")
                {
                    return BadRequest(new ResponseModel
                    {
                        IsSuccess = false,
                        Message = "Id cannot be null or empty",
                        Data = null

                    });
                }
                var response = await employeeRespository.GetbyId(id);
                if (response.IsSuccess)
                {
                    return Ok(response);
                }
                return BadRequest(response);
            }
            catch(Exception e)
            {
                return BadRequest(new ResponseModel
                {
                    IsSuccess = false,
                    Message = e.Message,
                    Data = null
                });
            }
        }

        [HttpPost("saveEmployee")]
        public async Task<IActionResult> SaveEmployee(EmployeesModel employeesModel)
        {
            try
            {
                var response = await employeeRespository.SaveEmployee(employeesModel);
                if (response.IsSuccess)
                {
                    return Ok(response);
                }
                return BadRequest(response);
            }
            catch (Exception e)
            {
                return BadRequest(new ResponseModel
                {
                    IsSuccess = false,
                    Message = e.Message,
                    Data = null
                });
            }
        }

        [HttpGet("deletebyid/{id}")]
        public async Task<IActionResult> DeleteById(string id)
        {
            try
            {
                if (id == null || id == "")
                {
                    return BadRequest(new ResponseModel
                    {
                        IsSuccess = false,
                        Message = "Id cannot be null or empty",
                        Data = null

                    });
                }
                var response = await employeeRespository.DeleteById(id);
                if (response.IsSuccess)
                {
                    return Ok(response);
                }
                return BadRequest(response);
            }
            catch (Exception e)
            {
                return BadRequest(new ResponseModel
                {
                    IsSuccess = false,
                    Message = e.Message,
                    Data = null
                });
            }
        }

    }
}
