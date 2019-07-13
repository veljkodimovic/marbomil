using AutoMapper;
using Marbomil.Api.Models.Order;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderView, OrderViewModel>();
            CreateMap<OrderItemView, OrderItemViewModel>();
            CreateMap<OrderCreateModel, OrderCrud>();
            CreateMap<OrderUpdateModel, OrderCrud>();
            CreateMap<OrderItemCrudModel, OrderItemCrud>();
        }
    }
}
