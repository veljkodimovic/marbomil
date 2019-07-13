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
    public class ServiceProfile : Profile
    {
        public ServiceProfile()
        {
            CreateMap<ServiceCrud, Service>();
            CreateMap<Service, ServiceCrud>();
            CreateMap<Service, ServiceView>();
        }
    }
}
