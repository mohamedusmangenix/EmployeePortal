using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations;

namespace CRUDAPI.Models.DBModels
{
    public class EmployeesModel
    {
        [Key]
        public string? Id { get; set; } = Guid.NewGuid().ToString();

        public string firstname { get; set; }

        public string lastname { get; set; }

        public DateTime Dateofbirth { get; set; }

        public DateTime joiningdate { get ; set; }

        public string department { get; set; }

        public string Designation { get; set; }

        public string status { get; set; }
    }
}
