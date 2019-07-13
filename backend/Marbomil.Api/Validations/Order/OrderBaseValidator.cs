using FluentValidation;
using Marbomil.Api.Models.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Order
{
    public abstract class OrderBaseValidator<T> : AbstractValidator<T> where T: OrderBaseModel
    {
        public OrderBaseValidator()
        {
            RuleFor(o => o.Date).NotEmpty();
            RuleFor(o => o.Items).Cascade(CascadeMode.StopOnFirstFailure)
                                 .NotNull()
                                 .NotEmpty();
        }
    }
}
