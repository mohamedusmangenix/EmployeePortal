using CRUDAPI.Models.DBModels;

namespace CRUDAPI.Interfaces
{
    public interface IEmployeeRespository
    {
        public Task<ResponseModel> GetAll();

        public Task<ResponseModel> GetbyId(string id);
        

        public Task<ResponseModel> SaveEmployee(EmployeesModel employee);

        public Task<ResponseModel> DeleteById(string id);
    }
}
