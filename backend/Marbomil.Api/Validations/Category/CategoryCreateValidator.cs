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
    public class CategoryCreateValidator : AbstractValidator<CategoryCreateModel>
    {
        private readonly ICategoryService categoryService;

        public CategoryCreateValidator(ICategoryService categoryService)
        {
            this.categoryService = categoryService;

            RuleFor(cat => cat.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must(ValidateTitle)
                                     .WithMessage("Category with passed Title already exists in the database.");
        }

        private bool ValidateTitle(string title)
        {
            return !this.categoryService.Select()
                                        .Any(cat => cat.Title == title);
        }
    }
}
