using FluentValidation;
using Marbomil.Api.Models.Order;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Order
{
    public class OrderItemUpdateValidator : OrderItemCreateValidator
    {
        private readonly IOrderService orderService;

        public OrderItemUpdateValidator(IOrderService orderService, IProductService productService) : base(productService)
        {
            this.orderService = orderService;

            RuleFor(o => o.Id).Must((orderItemData, id) => ValidateIdAndOrderId(id, orderItemData))
                              .WithMessage("To update OrderItem, proper OrderItem Id and related OrderId must be set.");
            RuleFor(o => o.OrderId).Cascade(CascadeMode.StopOnFirstFailure)
                                   .Must(ValidateIfOrderExists)
                                   .WithMessage("Order with passed Id does not exists in the database")
                                   .Must((orderItemData, orderId) => ValidateOrderItemId(orderId, orderItemData))
                                   .WithMessage("Passed OrderItem Id does not exists in the database.");
        }

        private bool ValidateOrderItemId(int? orderId, OrderItemCrudModel orderItemData)
        {
            bool isValid = true;

            if (orderId.HasValue
                &&
                orderItemData.Id > 0)
            {
                OrderView order = this.orderService.Select(orderId.Value);

                isValid = order.Items
                               .Any(i => i.Id == orderItemData.Id);
            }

            return isValid;
        }

        private bool ValidateIdAndOrderId(int orderItemId, OrderItemCrudModel orderItemData)
        {
            bool isValid = true;

            if (orderItemId > 0)
            {
                isValid = orderItemData.OrderId
                                       .HasValue;
            }

            return isValid;
        }

        private bool ValidateIfOrderExists(int? orderId)
        {
            bool isValid = true;

            if (orderId.HasValue)
            {
                isValid = this.orderService.Select(orderId.Value) != null;
            }

            return isValid;
        }
    }
}
