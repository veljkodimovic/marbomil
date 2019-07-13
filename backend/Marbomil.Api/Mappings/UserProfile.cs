using AutoMapper;
using Marbomil.Api.Models.User.Buyer;
using Marbomil.Api.Models.User.Marbomil;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserView, UserViewModel>().ForMember(dest => dest.Role, opt => opt.MapFrom(src => $"{src.Role}"));
            CreateMap<UserCreateModel, UserCrud>();
            CreateMap<UserUpdateModel, UserCrud>();

            CreateMap<UserView, BuyerViewModel>();
            CreateMap<BuyerCreateModel, UserCrud>().ForMember(dest => dest.Role, opt => opt.MapFrom(src => $"{UserRoles.Buyer}"));
            CreateMap<BuyerUpdateModel, UserCrud>().ForMember(dest => dest.Role, opt => opt.MapFrom(src => $"{UserRoles.Buyer}"));
        }
    }
}
