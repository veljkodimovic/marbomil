using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Database
{
    public class User : IdentityUser<int, UserLogin, UserRole, UserClaim>, IDbEntity
    {

        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        [MaxLength(50)]
        public string Code { get; set; }

        [MaxLength(100)]
        public string WorkPlace { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        [MaxLength(100)]
        public string CompanyName { get; set; }

        [MaxLength(100)]
        public string Address { get; set; }

        [MaxLength(100)]
        public string CompanyTaxIdentificationNumber { get; set; }

        [MaxLength(100)]
        public string CompanyRegistrationNumber { get; set; }

        [MaxLength(100)]
        public string AccountNumber { get; set; }

        [MaxLength(100)]
        public string ContactPerson { get; set; }

        [MaxLength(100)]
        public string ContactPhoneNumber { get; set; }

        [MaxLength(100)]
        public string Website { get; set; }

        public decimal Discount { get; set; }
    }
}