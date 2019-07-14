using Marbomil.Api.Models.Order;
using Marbomil.Infrastructure.Services;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Order
{
    public class OrderCreateValidator : OrderBaseValidator<OrderCreateModel>
    {

        public OrderCreateValidator(IProductService productService)
        {
            RuleFor(o => o.Items).Cascade(CascadeMode.StopOnFirstFailure)
                                 .NotNull()
                                 .NotEmpty();
            RuleForEach(o => o.Items).SetValidator(new OrderItemCreateValidator(productService));
        }

    }
}
