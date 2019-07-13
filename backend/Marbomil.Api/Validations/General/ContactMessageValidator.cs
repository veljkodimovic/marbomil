using FluentValidation;
using Marbomil.Api.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.General
{
    public class ContactMessageValidator : AbstractValidator<ContactMessageModel>
    {
        public ContactMessageValidator()
        {
            RuleFor(cm => cm.Email).Cascade(CascadeMode.StopOnFirstFailure)
                                   .NotEmpty()
                                   .EmailAddress();
            RuleFor(cm => cm.Subject).NotEmpty();
            RuleFor(cm => cm.Message).NotEmpty();
        }
    }
}
