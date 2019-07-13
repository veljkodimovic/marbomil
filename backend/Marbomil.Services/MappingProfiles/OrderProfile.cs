using AutoMapper;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services.MappingProfiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderCrud, Order>();
            CreateMap<OrderItemCrud, OrderItem>();
            CreateMap<Order, OrderView>().ForMember(dest => dest.BuyerUsername, opt => opt.MapFrom(src => src.Buyer
                                                                                                             .UserName));
            CreateMap<OrderItem, OrderItemView>().ForMember(dest => dest.ProductCode, opt => opt.MapFrom(src => src.Product
                                                                                                                   .Code))
                                                 .ForMember(dest => dest.Price, opt => opt.MapFrom(src => this.CalculatePriceWithDiscount(src)));
        }


        private decimal CalculatePriceWithDiscount(OrderItem orderItem)
        {
            decimal price = orderItem.Product
                                     .Price;
            decimal discount = orderItem.Order
                                        .Buyer
                                        .Discount;

            decimal discountMultiplier = discount == 0 ? 1 : discount / 100;

            return price * discountMultiplier;
        }
    }
}
