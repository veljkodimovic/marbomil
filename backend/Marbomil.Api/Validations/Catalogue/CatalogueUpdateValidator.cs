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
    public class CatalogueUpdateValidator : AbstractValidator<CatalogueUpdateModel>
    {
        private readonly ICatalogueService catalogueService;

        public CatalogueUpdateValidator(ICatalogueService catalogueService)
        {
            this.catalogueService = catalogueService;

            RuleFor(cat => cat.Id).Cascade(CascadeMode.StopOnFirstFailure)
                                  .NotEmpty()
                                  .Must(ValidateId)
                                  .WithMessage("Catalogue with passed Id does not exists in the database.");
            RuleFor(cat => cat.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must((catalogueData, title) => ValidateTitle(catalogueData, title))
                                     .WithMessage("Catalogue with passed Title already exists in the database.");
            RuleFor(cat => cat.Version).MaximumLength(100);
        }

        private bool ValidateId(int id)
        {
            return this.catalogueService.Select()
                                        .Any(cat => cat.Id == id);
        }

        private bool ValidateTitle(CatalogueUpdateModel catalogueData, string title)
        {
            return !this.catalogueService.Select()
                                         .Any(cat => cat.Id != catalogueData.Id
                                                     &&
                                                     cat.Title == title);
        }
    }
}
