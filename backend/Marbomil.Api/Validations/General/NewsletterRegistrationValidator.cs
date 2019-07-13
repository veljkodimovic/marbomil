using FluentValidation;
using Marbomil.Api.Models.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.General
{
    public class NewsletterRegistrationValidator : AbstractValidator<NewsletterRegistrationModel>
    {
        public NewsletterRegistrationValidator()
        {
            RuleFor(nwsr => nwsr.Email).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .EmailAddress();
        }
    }
}
