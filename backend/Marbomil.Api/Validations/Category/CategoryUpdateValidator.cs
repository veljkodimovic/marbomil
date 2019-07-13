using FluentValidation;
using Marbomil.Api.Models.Category;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Category
{
    public class CategoryUpdateValidator : AbstractValidator<CategoryUpdateModel>
    {
        private readonly ICategoryService categoryService;

        public CategoryUpdateValidator(ICategoryService categoryService)
        {
            this.categoryService = categoryService;

            RuleFor(cat => cat.Id).Cascade(CascadeMode.StopOnFirstFailure)
                                  .NotEmpty()
                                  .Must(ValidateId)
                                  .WithMessage("Category with passed Id does not exists in the database.");
            RuleFor(cat => cat.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must((categoryData, title) => ValidateTitle(categoryData, title))
                                     .WithMessage("Category with passed Title already exists in the database.");
        }

        private bool ValidateId(int id)
        {
            return this.categoryService.Select()
                                       .Any(cat => cat.Id == id);
        }

        private bool ValidateTitle(CategoryUpdateModel categoryData, string title)
        {
            return !this.categoryService.Select()
                                        .Any(cat => cat.Id != categoryData.Id
                                                    &&
                                                    cat.Title == title);
        }
    }
}
