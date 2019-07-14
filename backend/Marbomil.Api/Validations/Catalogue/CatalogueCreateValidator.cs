using FluentValidation;
using Marbomil.Api.Models.Catalogue;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Catalogue
{
    public class CatalogueCreateValidator : AbstractValidator<CatalogueCreateModel>
    {
        private readonly ICatalogueService catalogueService;

        public CatalogueCreateValidator(ICatalogueService catalogueService)
        {
            this.catalogueService = catalogueService;

            RuleFor(cat => cat.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must(ValidateTitle)
                                     .WithMessage("Catalogue with passed Title already exists in the database.");
            RuleFor(cat => cat.Version).MaximumLength(100);
        }

        private bool ValidateTitle(string title)
        {
            return !this.catalogueService.Select()
                                         .Any(cat => cat.Title == title);
        }
    }
}
