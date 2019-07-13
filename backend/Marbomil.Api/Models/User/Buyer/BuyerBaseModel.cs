using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.User.Buyer
{
    public abstract class BuyerBaseModel
    {
        public string Email { get; set; }
        public string Username { get; set; }
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
