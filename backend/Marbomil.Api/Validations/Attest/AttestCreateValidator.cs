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
    public class AttestCreateValidator : AbstractValidator<AttestCreateModel>
    {
        private readonly IAttestService attestService;

        public AttestCreateValidator(IAttestService attestService)
        {
            this.attestService = attestService;

            RuleFor(att => att.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must(ValidateTitle)
                                     .WithMessage("Attest with passed Title already exists in the database.");
        }

        private bool ValidateTitle(string title)
        {
            return !this.attestService.Select()
                                      .Any(att => att.Title == title);
        }
    }
}
