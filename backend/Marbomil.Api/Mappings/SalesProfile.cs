using AutoMapper;
using Marbomil.Api.Models.Sales;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class SalesProfile : Profile
    {
        public SalesProfile()
        {
            CreateMap<SalesCreateModel, SalesCrud>();
            CreateMap<SalesUpdateModel, SalesCrud>();
            CreateMap<SalesView, SalesViewModel>();
        }
    }
}
