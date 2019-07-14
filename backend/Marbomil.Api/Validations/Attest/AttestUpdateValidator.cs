using FluentValidation;
using Marbomil.Api.Models.Attest;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Attest
{
    public class AttestUpdateValidator : AbstractValidator<AttestUpdateModel>
    {
        private readonly IAttestService attestService;

        public AttestUpdateValidator(IAttestService attestService)
        {
            this.attestService = attestService;

            RuleFor(att => att.Id).Cascade(CascadeMode.StopOnFirstFailure)
                                  .NotEmpty()
                                  .Must(ValidateId)
                                  .WithMessage("Attest with passed Id does not exists in the database.");
            RuleFor(att => att.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must((attestData, title) => ValidateTitle(attestData, title))
                                     .WithMessage("Attest with passed Title already exists in the database.");
        }
        
        private bool ValidateId(int id)
        {
            return this.attestService.Select()
                                     .Any(att => att.Id == id);
        }

        private bool ValidateTitle(AttestUpdateModel attestData, string title)
        {
            return !this.attestService.Select()
                                      .Any(att => att.Id != attestData.Id
                                                  &&
                                                  att.Title == title);
        }
    }
}
