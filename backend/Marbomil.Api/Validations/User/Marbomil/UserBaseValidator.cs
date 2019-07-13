using FluentValidation;
using Marbomil.Api.Models.User;
using Marbomil.Api.Models.User.Marbomil;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.User.Marbomil
{
    public abstract class UserBaseValidator<T> : AbstractValidator<T> where T: UserBaseModel
    {
        protected readonly IUserService userService;

        public UserBaseValidator(IUserService userService)
        {
            this.userService = userService;

            RuleFor(u => u.Email).Cascade(CascadeMode.StopOnFirstFailure)
                                 .NotEmpty()
                                 .MaximumLength(256)
                                 .EmailAddress();
            RuleFor(u => u.Role).Cascade(CascadeMode.StopOnFirstFailure)
                                .NotNull();
            RuleFor(u => u.FirstName).MaximumLength(100);
            RuleFor(u => u.LastName).MaximumLength(100);
            RuleFor(u => u.Code).MaximumLength(50);
            RuleFor(u => u.WorkPlace).MaximumLength(100);
        }
    }
}
