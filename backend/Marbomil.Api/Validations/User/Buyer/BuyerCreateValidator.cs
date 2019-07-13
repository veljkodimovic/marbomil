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
    public class BuyerCreateValidator : BuyerBaseValidator<BuyerCreateModel>
    {
        public BuyerCreateValidator(IUserService userService) : base(userService)
        {
            RuleFor(u => u.Username).Cascade(CascadeMode.StopOnFirstFailure)
                                    .NotEmpty()
                                    .Must(ValidateIfUsernameExists)
                                    .WithMessage("Username is in use.");
            RuleFor(u => u.Password).NotEmpty();
        }


        private bool ValidateIfUsernameExists(string username)
        {
            return !this.userService.Exists(username);
        }
    }
}
