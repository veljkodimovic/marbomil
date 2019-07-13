using AutoMapper;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserCrud, User>().ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Username));
            CreateMap<User, UserCrud>().ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName))
                                       .ForMember(dest => dest.Role, opt => opt.MapFrom(src => (UserRoles)src.Roles
                                                                                                             .First()
                                                                                                             .RoleId));
            CreateMap<User, UserView>().ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName))
                                       .ForMember(dest => dest.Role, opt => opt.MapFrom(src => (UserRoles)src.Roles
                                                                                                             .First()
                                                                                                             .RoleId));
        }
    }
}
