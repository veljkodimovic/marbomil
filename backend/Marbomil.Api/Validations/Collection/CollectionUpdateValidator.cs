using FluentValidation;
using Marbomil.Api.Models.Collection;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Collection
{
    public class CollectionUpdateValidator : AbstractValidator<CollectionUpdateModel>
    {
        private readonly ICollectionService collectionService;
        private readonly ICategoryService categoryService;

        public CollectionUpdateValidator(ICollectionService collectionService, ICategoryService categoryService)
        {
            this.collectionService = collectionService;
            this.categoryService = categoryService;

            RuleFor(coll => coll.Id).Cascade(CascadeMode.StopOnFirstFailure)
                                    .NotEmpty()
                                    .Must(ValidateId)
                                    .WithMessage("Collection with passed Id does not exists in the database.");
            RuleFor(coll => coll.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .MaximumLength(100)
                                       .Must((collectionData, title) => ValidateTitle(collectionData, title))
                                       .WithMessage("Collection with passed Title already exists in the database.");
            RuleFor(coll => coll.CategoryId).Cascade(CascadeMode.StopOnFirstFailure)
                                            .Must(ValidateCategory)
                                            .WithMessage("Category with passed Id does not exists in the database.")
                                            .When(coll => coll.CategoryId.HasValue);
        }

        private bool ValidateId(int id)
        {
            return this.collectionService.Select()
                                         .Any(coll => coll.Id == id);
        }

        private bool ValidateTitle(CollectionUpdateModel collectionData, string title)
        {
            return !this.collectionService.Select()
                                          .Any(coll => coll.Id != collectionData.Id
                                                       &&
                                                       coll.Title == title);
        }

        private bool ValidateCategory(int? categoryId)
        {
            return this.categoryService.Select()
                                       .Any(cat => cat.Id == categoryId.Value);
        }
    }
}
