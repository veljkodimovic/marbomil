using AutoMapper;
using Marbomil.Api.Models.Service;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class ServiceProfile : Profile
    {
        public ServiceProfile()
        {
            CreateMap<ServiceCreateModel, ServiceCrud>();
            CreateMap<ServiceUpdateModel, ServiceCrud>();
            CreateMap<ServiceView, ServiceViewModel>();
        }
    }
}
