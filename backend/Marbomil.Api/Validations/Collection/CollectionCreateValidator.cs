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
    public class CollectionCreateValidator : AbstractValidator<CollectionCreateModel>
    {
        private readonly ICollectionService collectionService;
        private readonly ICategoryService categoryService;

        public CollectionCreateValidator(ICollectionService collectionService, ICategoryService categoryService)
        {
            this.collectionService = collectionService;
            this.categoryService = categoryService;

            RuleFor(coll => coll.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .MaximumLength(100)
                                       .Must(ValidateTitle)
                                       .WithMessage("Collection with passed Title already exists in the database.");
            RuleFor(coll => coll.CategoryId).Cascade(CascadeMode.StopOnFirstFailure)
                                            .Must(ValidateCategory)
                                            .WithMessage("Category with passed Id does not exists in the database.")
                                            .When(coll => coll.CategoryId.HasValue);
        }

        private bool ValidateTitle(string title)
        {
            return !this.collectionService.Select()
                                          .Any(coll => coll.Title == title);
        }

        private bool ValidateCategory(int? categoryId)
        {
            return this.categoryService.Select()
                                       .Any(cat => cat.Id == categoryId.Value);
        }
    }
}
