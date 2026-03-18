using CRUDAPI.Models.DBModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace CRUDAPI.Models
{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }
            public DbSet<EmployeesModel> Employees { get; set; }

    }
}
