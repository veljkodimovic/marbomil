using FluentValidation;
using Marbomil.Api.Models.User.Buyer;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.User.Buyer
{
    public abstract class BuyerBaseValidator<T> : AbstractValidator<T> where T : BuyerBaseModel
    {
        protected readonly IUserService userService;

        public BuyerBaseValidator(IUserService userService)
        {
            this.userService = userService;

            RuleFor(u => u.Email).Cascade(CascadeMode.StopOnFirstFailure)
                                 .NotEmpty()
                                 .MaximumLength(256)
                                 .EmailAddress();
            RuleFor(u => u.CompanyName).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .MaximumLength(100);
            RuleFor(u => u.Address).MaximumLength(100);
            RuleFor(u => u.CompanyTaxIdentificationNumber).MaximumLength(50);
            RuleFor(u => u.CompanyRegistrationNumber).MaximumLength(100);
            RuleFor(u => u.AccountNumber).MaximumLength(100);
            RuleFor(u => u.ContactPerson).MaximumLength(100);
            RuleFor(u => u.ContactPhoneNumber).MaximumLength(50);
            RuleFor(u => u.Website).MaximumLength(100);
            RuleFor(u => u.Discount).GreaterThanOrEqualTo(0);
        }
    }
}
