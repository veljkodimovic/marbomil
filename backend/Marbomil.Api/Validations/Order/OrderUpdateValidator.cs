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
    public class OrderUpdateValidator : OrderBaseValidator<OrderUpdateModel>
    {
        private readonly IOrderService orderService;
        private readonly IUserService userService;

        public OrderUpdateValidator(IOrderService orderService, IProductService productService, IUserService userService)
        {
            this.orderService = orderService;
            this.userService = userService;

            RuleFor(o => o.Id).Cascade(CascadeMode.StopOnFirstFailure)
                              .NotEmpty()
                              .Must(ValidateIfExists)
                              .WithMessage("Order with passed Id does not exists in the database")
                              .Must((orderData, orderId) => ValidateOrderItems(orderId, orderData))
                              .WithMessage("Passed Order Id and some or all OrderId properties in the Items does not have the same value.");
            RuleFor(o => o.BuyerId).Cascade(CascadeMode.StopOnFirstFailure)
                                   .NotNull()
                                   .NotEmpty()
                                   .Must(ValidateIfBuyerExists)
                                   .WithMessage("Buyer with passed Id does not exists in the database.");
            RuleFor(o => o.Items).Cascade(CascadeMode.StopOnFirstFailure)
                                 .NotNull()
                                 .NotEmpty();
            RuleForEach(o => o.Items).SetValidator(new OrderItemUpdateValidator(orderService, productService));
        }

        
        private bool ValidateIfExists(int orderId)
        {
            return this.orderService.Select(orderId) != null;
        }

        private bool ValidateOrderItems(int orderId, OrderUpdateModel orderData)
        {
            return !orderData.Items
                             .Any(i => i.OrderId.HasValue
                                       &&
                                       i.OrderId != orderId);
        }

        private bool ValidateIfBuyerExists(int userId)
        {
            return this.userService.Exists(userId);
        }
    }
}
