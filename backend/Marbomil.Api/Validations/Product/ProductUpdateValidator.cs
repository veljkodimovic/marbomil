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
    public class ProductUpdateValidator : AbstractValidator<ProductUpdateModel>
    {
        private readonly IProductService productService;
        private readonly ICategoryService categoryService;
        private readonly ICollectionService collectionService;

        public ProductUpdateValidator(IProductService productService, ICategoryService categoryService, ICollectionService collectionService)
        {
            this.productService = productService;
            this.categoryService = categoryService;
            this.collectionService = collectionService;

            RuleFor(prod => prod.Id).Cascade(CascadeMode.StopOnFirstFailure)
                                    .NotEmpty()
                                    .Must(ValidateId)
                                    .WithMessage("Product with passed Id does not exists in the database.");
            RuleFor(prod => prod.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .MaximumLength(100)
                                       .Must((productData, title) => ValidateTitle(productData, title))
                                       .WithMessage("Product with passed Title already exists in the database.");
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

        private bool ValidateId(int id)
        {
            return this.productService.Select()
                                      .Any(prod => prod.Id == id);
        }

        private bool ValidateTitle(ProductUpdateModel productData, string title)
        {
            return !this.productService.Select()
                                       .Any(prod => prod.Id != productData.Id
                                                    &&
                                                    prod.Title == title
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
