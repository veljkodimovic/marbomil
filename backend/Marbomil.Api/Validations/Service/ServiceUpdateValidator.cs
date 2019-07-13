using FluentValidation;
using Marbomil.Api.Models.Service;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Service
{
    public class ServiceUpdateValidator : AbstractValidator<ServiceUpdateModel>
    {
        private readonly IServiceSupportService supportService;

        public ServiceUpdateValidator(IServiceSupportService supportService)
        {
            this.supportService = supportService;

            RuleFor(supp => supp.Id).Cascade(CascadeMode.StopOnFirstFailure)
                                    .NotEmpty()
                                    .Must(ValidateId)
                                    .WithMessage("Service Support with passed Id does not exists in the database.");
            RuleFor(supp => supp.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .MaximumLength(100)
                                       .Must((serviceData, title) => ValidateTitle(serviceData, title))
                                       .WithMessage("Service Support with passed Title already exists in the database.");
            RuleFor(supp => supp.Street).MaximumLength(200);
            RuleFor(supp => supp.City).MaximumLength(100);
            RuleFor(supp => supp.PostalCode).MaximumLength(50);
            RuleFor(supp => supp.Region).MaximumLength(100);
            RuleFor(supp => supp.Country).MaximumLength(100);
            RuleFor(supp => supp.Latitude).MaximumLength(100);
            RuleFor(supp => supp.Longitude).MaximumLength(100);
            RuleFor(supp => supp.Phone).MaximumLength(50);
            RuleFor(supp => supp.Email).MaximumLength(50);
            RuleFor(supp => supp.Website).MaximumLength(50);
        }

        private bool ValidateId(int id)
        {
            return this.supportService.Select()
                                      .Any(supp => supp.Id == id);
        }

        private bool ValidateTitle(ServiceUpdateModel serviceData, string title)
        {
            return !this.supportService.Select()
                                       .Any(supp => supp.Id != serviceData.Id
                                                    &&
                                                    supp.Title == title);
        }
    }
}
