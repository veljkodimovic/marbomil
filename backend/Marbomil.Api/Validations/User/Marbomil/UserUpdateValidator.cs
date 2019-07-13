using FluentValidation;
using Marbomil.Api.Models.User;
using Marbomil.Api.Models.User.Marbomil;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.User.Marbomil
{
    public class UserUpdateValidator : UserBaseValidator<UserUpdateModel>
    {

        public UserUpdateValidator(IUserService userService) : base(userService)
        {
            RuleFor(u => u.Id).Cascade(CascadeMode.StopOnFirstFailure)
                              .NotEmpty()
                              .Must(ValidateUserId)
                              .WithMessage("User with passed Id does not exists.")
                              .Must((userData, userId) => ValidateUserIdAndUsername(userData, userId))
                              .WithMessage("Username is not valid. User with passed Id and has different username.");
            RuleFor(u => u.Username).NotEmpty();
        }

        
        private bool ValidateUserId(int userId)
        {
            UserView user = this.userService.Select(userId);

            return user != null;
        }

        private bool ValidateUserIdAndUsername(UserUpdateModel userData, int userId)
        {
            UserView user = this.userService.Select(userId);

            return userData.Username
                           .Equals(user.Username);
        }
    }
}
