using FluentValidation;
using Marbomil.Api.Models.Order;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Order
{
    public class OrderItemCreateValidator : AbstractValidator<OrderItemCrudModel>
    {
        private readonly IProductService productService;

        public OrderItemCreateValidator(IProductService productService)
        {
            this.productService = productService;

            RuleFor(o => o.ProductId).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .Must(ValidateIfProductExists)
                                     .WithMessage("Product with passed Id does not exists in the database");
            RuleFor(o => o.Quantity).Cascade(CascadeMode.StopOnFirstFailure)
                                    .NotEmpty()
                                    .GreaterThan(0);
        }

        private bool ValidateIfProductExists(int? productId)
        {
            return this.productService.Select(productId.Value) != null;
        }
    }
}
