using FluentValidation;
using Marbomil.Api.Models.Product;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Product
{
    public class ProductCreateValidator : AbstractValidator<ProductCreateModel>
    {
        private readonly IProductService productService;
        private readonly ICategoryService categoryService;
        private readonly ICollectionService collectionService;

        public ProductCreateValidator(IProductService productService, ICategoryService categoryService, ICollectionService collectionService)
        {
            this.productService = productService;
            this.categoryService = categoryService;
            this.collectionService = collectionService;

            RuleFor(prod => prod.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .MaximumLength(100)
                                       .Must((productData, title) => ValidateTitle(productData, title))
                                       .WithMessage("Product with passed Title in selected Category already exists in the database.");
            RuleFor(prod => prod.Code).Cascade(CascadeMode.StopOnFirstFailure)
                                      .NotEmpty()
                                      .MaximumLength(50);
            RuleFor(prod => prod.CategoryId).Cascade(CascadeMode.StopOnFirstFailure)
                                            .NotEmpty()
                                            .Must(ValidateCategory)
                                            .WithMessage("Category with passed Id does not exists in the database.");
            RuleFor(coll => coll.CollectionId).Cascade(CascadeMode.StopOnFirstFailure)
                                              .Must(ValidateCollection)
                                              .WithMessage("Collection with passed Id does not exists in the database.")
                                              .When(coll => coll.CollectionId.HasValue);
        }

        
        private bool ValidateTitle(ProductCreateModel productData, string title)
        {
            return !this.productService.Select()
                                       .Any(prod => prod.Title == title
                                                    &&
                                                    prod.CategoryId == productData.CategoryId);
        }

        private bool ValidateCategory(int categoryId)
        {
            return this.categoryService.Select()
                                       .Any(cat => cat.Id == categoryId);
        }

        private bool ValidateCollection(int? collectionId)
        {
            return this.collectionService.Select()
                                         .Any(coll => coll.Id == collectionId.Value);
        }
    }
}
