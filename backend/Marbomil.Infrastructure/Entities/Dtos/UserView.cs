using Marbomil.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Dtos
{
    public class UserView : IViewDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public UserRoles Role { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Code { get; set; }
        public string WorkPlace { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string CompanyTaxIdentificationNumber { get; set; }
        public string CompanyRegistrationNumber { get; set; }
        public string AccountNumber { get; set; }
        public string ContactPerson { get; set; }
        public string ContactPhoneNumber { get; set; }
        public string Website { get; set; }
        public decimal Discount { get; set; }
    }
}
